"use client";

import Modal from "@/components/admin/Modal";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Plan = {
  id: string;
  name: string;
  price: number;
  credits: number;
  validity?: number | null;
  image?: string | null;
  description: string;
};

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

export default function AdminPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    price: "",
    credits: "",
    validity: "",
    image: "",
    description: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [editPlan, setEditPlan] = useState<Plan | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  async function fetchPlans() {
    setLoading(true);
    const res = await fetch("/api/admin/plans");
    const data = await res.json();
    setPlans(data);
    setLoading(false);
  }

  async function createPlan(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.price || !form.credits || !form.description) {
      toast.error("Name, price, and credits are required");
      return;
    }

    try {
      const res = await fetch("/api/admin/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          price: Number(form.price),
          credits: Number(form.credits),
          description: form.description,
          validity: form.validity ? Number(form.validity) : null,
          image: form.image || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create plan");

      toast.success("Plan created successfully");
      setForm({
        name: "",
        price: "",
        credits: "",
        validity: "",
        image: "",
        description: "",
      });
      fetchPlans();
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  function openEditModal(plan: Plan) {
    setEditPlan(plan);
    setModalOpen(true);
  }

  async function updatePlan(e: React.FormEvent) {
    e.preventDefault();
    if (!editPlan) return;
    setModalLoading(true);

    try {
      const res = await fetch(`/api/admin/plans/${editPlan.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editPlan.name,
          price: editPlan.price,
          credits: editPlan.credits,
          validity: editPlan.validity,
          image: editPlan.image,
          description: editPlan.description,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update plan");

      toast.success("Plan updated successfully");
      setEditPlan(null);
      setModalOpen(false);
      fetchPlans();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setModalLoading(false);
    }
  }

  useEffect(() => {
    fetchPlans();
  }, []);

  if (loading) return <p>Loading plans...</p>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Plans</h1>
        <p className="text-sm text-muted-foreground">
          Manage subscription plans.
        </p>
      </div>

      <form
        onSubmit={createPlan}
        className="rounded-2xl border border-primary bg-card p-6 shadow-lg space-y-4"
      >
        <h2 className="text-lg font-semibold">Create New Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
          <label className="font-medium">Name*</label>
          <input
            placeholder="Enter plan name"
            className="w-full rounded-xl border border-primary/50 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          </div>
          <div className="space-y-1">
          <label className="font-medium">Price*</label>
          <input
            placeholder="Enter price"
            type="number"
            className="w-full rounded-xl border border-primary/50 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          </div>
          <div className="space-y-1">
          <label className="font-medium">Credits*</label>
          <input
            placeholder="Total credits"
            type="number"
            className="w-full rounded-xl border border-primary/50 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.credits}
            onChange={(e) => setForm({ ...form, credits: e.target.value })}
          />
          </div>
          <div className="space-y-1">
          <label className="font-medium">Validity</label>
          <input
            placeholder="Validity (days)"
            type="number"
            className="w-full rounded-xl border border-primary/50 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.validity}
            onChange={(e) => setForm({ ...form, validity: e.target.value })}
          />
          </div>
          <div className="space-y-1">
            <label className="font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                if (e.target.files?.[0]) {
                  const base64 = await fileToBase64(e.target.files[0]);
                  setForm({ ...form, image: base64 });
                }
              }}
              className="w-full rounded-xl border border-primary/50 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <textarea
            placeholder="Description"
            className="md:col-span-2 rounded-xl border border-primary/50 bg-background px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-primary"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div className="flex justify-end">
          <button className="rounded-xl bg-primary px-5 py-2 font-medium text-primary-foreground hover:opacity-90 transition">
            Create Plan
          </button>
        </div>
      </form>

      <div className="rounded-2xl border border-primary bg-card shadow-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="text-left text-muted-foreground border-b border-primary">
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Credits</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.length ? (
              plans.map((plan) => (
                <tr key={plan.id} className="border-t border-primary">
                  <td className="p-4 font-medium flex items-center gap-2">
                    {plan.image && (
                      <img
                        src={plan.image}
                        alt={plan.name}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                    )}
                    {plan.name}
                  </td>
                  <td className="p-4">{plan.price}</td>
                  <td className="p-4">{plan.credits}</td>
                  <td className="p-4 text-muted-foreground max-w-xs">
                    <p className="truncate" title={plan.description}>
                      {plan.description ?? "-"}
                    </p>
                    {plan.validity && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Validity: {plan.validity} day
                        {plan.validity > 1 ? "s" : ""}
                      </p>
                    )}
                  </td>
                  <td className="p-4 text-center space-x-2">
                    <button
                      onClick={() => openEditModal(plan)}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-muted-foreground"
                >
                  No plans created yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal
        open={modalOpen && !!editPlan}
        title="Edit Plan"
        loading={modalLoading}
        onClose={() => {
          setEditPlan(null);
          setModalOpen(false);
        }}
        onSubmit={updatePlan}
        submitLabel="Update"
      >
        <div className="space-y-1">
          <label className="font-medium">Name</label>
          <input
            value={editPlan?.name ?? ""}
            onChange={(e) =>
              setEditPlan({ ...editPlan!, name: e.target.value })
            }
            className="w-full rounded-xl border border-primary/50 bg-background px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="font-medium">Price</label>
            <input
              type="number"
              value={editPlan?.price ?? 0}
              onChange={(e) =>
                setEditPlan({ ...editPlan!, price: Number(e.target.value) })
              }
              className="w-full rounded-xl border border-primary/50 bg-background px-3 py-2"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium">Credits</label>
            <input
              type="number"
              value={editPlan?.credits ?? 0}
              onChange={(e) =>
                setEditPlan({ ...editPlan!, credits: Number(e.target.value) })
              }
              className="w-full rounded-xl border border-primary/50 bg-background px-3 py-2"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-medium">Validity (days)</label>
          <input
            type="number"
            value={editPlan?.validity ?? ""}
            onChange={(e) =>
              setEditPlan({
                ...editPlan!,
                validity: Number(e.target.value),
              })
            }
            className="w-full rounded-xl border border-primary/50 bg-background px-3 py-2"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={async (e) => {
              if (e.target.files?.[0]) {
                const base64 = await fileToBase64(e.target.files[0]);
                setEditPlan({ ...editPlan!, image: base64 });
              }
            }}
            className="w-full rounded-xl border border-primary/50 bg-background px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Description</label>
          <textarea
            value={editPlan?.description ?? ""}
            onChange={(e) =>
              setEditPlan({ ...editPlan!, description: e.target.value })
            }
            className="w-full rounded-xl border border-primary/50 bg-background px-3 py-2 h-32"
          />
        </div>
      </Modal>
    </div>
  );
}
