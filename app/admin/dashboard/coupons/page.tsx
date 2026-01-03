"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/admin/Modal";
import { toast } from "react-toastify";

type Coupon = {
  id: string;
  code: string;
  percentage: number;
  usagePerUser: number;
  maxUsers: number;
  usedCount: number;
  isActive: boolean;
};

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [form, setForm] = useState({
    code: "",
    percentage: "",
    usagePerUser: "",
    maxUsers: "",
  });

  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [deleteCouponId, setDeleteCouponId] = useState<string | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  async function fetchCoupons() {
    const res = await fetch("/api/admin/coupons");
    setCoupons(await res.json());
  }

  async function createCoupon(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: form.code,
          percentage: Number(form.percentage),
          usagePerUser: Number(form.usagePerUser),
          maxUsers: Number(form.maxUsers),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to create coupon");
        return;
      }

      toast.success("Coupon created successfully!");
      setForm({ code: "", percentage: "", usagePerUser: "", maxUsers: "" });
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  }

  async function updateCoupon(e: React.FormEvent) {
    e.preventDefault();
    if (!editingCoupon) return;

    setModalLoading(true);

    try {
      const res = await fetch(`/api/admin/coupons/${editingCoupon.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          percentage: editingCoupon.percentage,
          usagePerUser: editingCoupon.usagePerUser,
          maxUsers: editingCoupon.maxUsers,
          isActive: editingCoupon.isActive,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to update coupon");
        setModalLoading(false);
        return;
      }

      toast.success("Coupon updated successfully!");
      setEditingCoupon(null);
      fetchCoupons();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setModalLoading(false);
    }
  }

  async function confirmDeleteCoupon() {
    if (!deleteCouponId) return;
    const res = await fetch(`/api/admin/coupons/${deleteCouponId}`, { method: "DELETE" });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to delete coupon");
    }
    setDeleteCouponId(null);
    fetchCoupons();
  }

  async function toggleActive(coupon: Coupon) {
    const original = coupon.isActive;
    setCoupons((prev) =>
      prev.map((c) =>
        c.id === coupon.id ? { ...c, isActive: !c.isActive } : c
      )
    );

    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...coupon, isActive: !coupon.isActive }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update status");
      }
    } catch (err: any) {
      toast.error(err.message);
      // revert back
      setCoupons((prev) =>
        prev.map((c) => (c.id === coupon.id ? { ...c, isActive: original } : c))
      );
    }
  }

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Coupons</h1>
        <p className="text-foreground/70 mt-1">
          Create and manage discount coupons
        </p>
      </header>

      <section className="rounded-3xl border border-primary bg-primary/5 p-6">
        <h2 className="text-xl font-semibold mb-4">Create Coupon</h2>

        <form
          onSubmit={createCoupon}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <input
            placeholder="Coupon Code"
            className="rounded-xl border border-primary/40 bg-background p-3"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
          />
          <input
            placeholder="% Discount"
            type="number"
            className="rounded-xl border border-primary/40 bg-background p-3"
            value={form.percentage}
            onChange={(e) => setForm({ ...form, percentage: e.target.value })}
          />
          <input
            placeholder="Usage per user"
            type="number"
            className="rounded-xl border border-primary/40 bg-background p-3"
            value={form.usagePerUser}
            onChange={(e) => setForm({ ...form, usagePerUser: e.target.value })}
          />
          <input
            placeholder="Max users"
            type="number"
            className="rounded-xl border border-primary/40 bg-background p-3"
            value={form.maxUsers}
            onChange={(e) => setForm({ ...form, maxUsers: e.target.value })}
          />

          <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
            <button className="rounded-xl bg-primary px-3 md:px-8 py-3 font-semibold text-background hover:opacity-90 transition">
              Create Coupon
            </button>
          </div>
        </form>
      </section>

      {coupons.length > 0 && (
        <section className="rounded-3xl border border-primary overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-primary/10 border-b border-primary">
              <tr>
                <th className="p-4 text-left">Code</th>
                <th className="p-4 text-center">%</th>
                <th className="p-4 text-center">Per User</th>
                <th className="p-4 text-center">Max Users</th>
                <th className="p-4 text-center">Used</th>
                <th className="p-4 text-center">Active</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((c) => (
                <tr
                  key={c.id}
                  className="border-t border-primary/20 hover:bg-primary/5"
                >
                  <td className="p-4 font-mono">{c.code}</td>
                  <td className="p-4 text-center">{c.percentage}%</td>
                  <td className="p-4 text-center">{c.usagePerUser}</td>
                  <td className="p-4 text-center">{c.maxUsers}</td>
                  <td className="p-4 text-center">{c.usedCount}</td>

                  {/* Toggle Active */}
                  <td className="p-4 text-center">
                    <button
                      onClick={() => toggleActive(c)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        c.isActive ? "bg-green-600" : "bg-gray-400"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          c.isActive ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="p-4 text-center space-x-3">
                    <button
                      onClick={() => setEditingCoupon(c)}
                      className="text-primary font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteCouponId(c.id)}
                      className="text-red-600 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Edit Modal */}
      <Modal
        open={!!editingCoupon}
        title="Edit Coupon"
        loading={modalLoading}
        onClose={() => setEditingCoupon(null)}
        onSubmit={updateCoupon}
        submitLabel="Update"
      >
        {editingCoupon && (
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="font-medium">Coupon Code</label>
              <input
                className="w-full rounded-xl border border-primary/40 p-3 bg-muted/50"
                value={editingCoupon.code}
                disabled
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium">Discount Percentage</label>
              <input
                type="number"
                className="w-full rounded-xl border border-primary/40 p-3"
                value={editingCoupon.percentage}
                onChange={(e) =>
                  setEditingCoupon({
                    ...editingCoupon,
                    percentage: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium">Usage Per User</label>
              <input
                type="number"
                className="w-full rounded-xl border border-primary/40 p-3"
                value={editingCoupon.usagePerUser ?? 1}
                onChange={(e) =>
                  setEditingCoupon({
                    ...editingCoupon,
                    usagePerUser: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-1">
              <label className="font-medium">Maximum Users</label>
              <input
                type="number"
                className="w-full rounded-xl border border-primary/40 p-3"
                value={editingCoupon.maxUsers}
                onChange={(e) =>
                  setEditingCoupon({
                    ...editingCoupon,
                    maxUsers: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={!!deleteCouponId}
        title="Delete Coupon"
        loading={false}
        onClose={() => setDeleteCouponId(null)}
        onSubmit={(e) => {
          e.preventDefault();
          confirmDeleteCoupon();
        }}
        submitLabel="Delete"
      >
        <p>
          Are you sure you want to delete this coupon? This action cannot be
          undone.
        </p>
      </Modal>
    </div>
  );
}
