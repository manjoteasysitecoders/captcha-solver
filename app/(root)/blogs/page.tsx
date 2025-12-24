"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { blogs } from "@/constants/blogs";
import { motion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter blogs by search term
  const filteredBlogs = useMemo(
    () =>
      blogs.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / POSTS_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return filteredBlogs.slice(start, start + POSTS_PER_PAGE);
  }, [currentPage, filteredBlogs]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.section
      id="blogs"
      className="py-20 md:py-28 bg-foreground"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-background">
            Insights & Developer Guides
          </h2>
          <p className="mt-3 text-background/70">
            Latest insights, tutorials, and best practices for building
            accessible and authorized automation with our APIs.
          </p>
        </motion.div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-10">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset page on search
            }}
            placeholder="Search blogs..."
            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Blog Grid */}
        <motion.div
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          {paginatedBlogs.length > 0 ? (
            paginatedBlogs.map((post) => (
              <motion.div
                key={post.title}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                className="group rounded-2xl overflow-hidden shadow-lg bg-background/5 border border-primary transition"
              >
                <Link href={post.link}>
                  <div className="relative w-full h-50 xl:h-60 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-background line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm text-background/50 line-clamp-3">
                      {post.description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-background/50">
                        {post.author}
                      </span>
                      <span className="text-sm text-background/50">
                        {post.date}
                      </span>
                    </div>
                    {post.tag && (
                      <span className="mt-3 inline-block text-xs bg-primary/20 text-primary px-3 py-1 rounded-full">
                        {post.tag}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No blogs found.
            </p>
          )}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-primary text-background"
                    : "bg-background text-gray-300 border border-gray-600"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
