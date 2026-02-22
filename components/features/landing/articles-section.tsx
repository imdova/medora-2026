"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { motion } from "motion/react";

const articles = [
  {
    id: "1",
    date: "Feb 22, 2026",
    title: "How to maintain a healthy lifestyle",
    excerpt: "Simple daily habits that can improve your long-term health and energy levels.",
  },
  {
    id: "2",
    date: "Feb 20, 2026",
    title: "What is the future of medical science?",
    excerpt: "Exploring emerging technologies and their impact on diagnosis and treatment.",
  },
  {
    id: "3",
    date: "Feb 18, 2026",
    title: "Understanding preventive care",
    excerpt: "Why regular check-ups and screenings matter more than you might think.",
  },
  {
    id: "4",
    date: "Feb 15, 2026",
    title: "Mental health and wellness tips",
    excerpt: "Practical steps to support your mental well-being alongside physical health.",
  },
];

export function ArticlesSection() {
  return (
    <section className="py-16 md:py-20 bg-muted/30" id="blog">
      <div className="container mx-auto max-w-7xl px-4">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-primary">Latest</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Stay Updated With Our Latest Articles
          </h2>
        </motion.div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-hidden transition hover:shadow-md">
                <div className="aspect-video bg-muted" />
                <CardHeader className="pb-1">
                  <p className="text-xs text-muted-foreground">{article.date}</p>
                  <p className="font-semibold text-foreground line-clamp-2">
                    {article.title}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {article.excerpt}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="p-0 h-auto text-primary" asChild>
                    <Link href="#blog">Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Button size="lg" asChild>
            <Link href="#blog">View All Articles</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
