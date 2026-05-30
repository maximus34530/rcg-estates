import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/mockData";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | RCG Estates`,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[#111827] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#0A3594]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <span className="text-[#6B93D6] text-[10px] font-mono font-semibold tracking-widest uppercase mb-3 block">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-5">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-gray-400">
            <span className="font-medium text-gray-300">{post.author}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{post.readTime}</span>
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                <Tag className="w-3 h-3" />{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray prose-lg max-w-none
            prose-headings:text-[#111827] prose-headings:font-bold prose-headings:tracking-tight
            prose-h1:text-3xl prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-li:text-gray-600
            prose-strong:text-[#111827]
            prose-a:text-[#0A3594] prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-[#0A3594] prose-blockquote:text-gray-500
          ">
            {post.body.split("\n").map((line, i) => {
              if (line.startsWith("# "))
                return <h1 key={i} className="text-3xl font-bold text-[#111827] mt-0 mb-6">{line.slice(2)}</h1>;
              if (line.startsWith("## "))
                return <h2 key={i} className="text-2xl font-bold text-[#111827] mt-10 mb-4">{line.slice(3)}</h2>;
              if (line.startsWith("- **")) {
                const match = line.match(/^- \*\*(.+?)\*\*(.*)$/);
                if (match)
                  return (
                    <li key={i} className="text-gray-600 mb-1.5 list-disc ml-5">
                      <strong className="text-[#111827]">{match[1]}</strong>{match[2]}
                    </li>
                  );
              }
              if (line.startsWith("- "))
                return <li key={i} className="text-gray-600 mb-1.5 list-disc ml-5">{line.slice(2)}</li>;
              if (line.trim() === "") return <br key={i} />;
              return <p key={i} className="text-gray-600 leading-relaxed mb-4">{line}</p>;
            })}
          </div>

          {/* In-article CTA */}
          <div className="mt-14 p-8 rounded-2xl bg-[#111827] border border-white/8 text-center">
            <div className="w-8 h-[2px] bg-[#0A3594] mx-auto mb-5" />
            <h3 className="text-white font-bold text-xl mb-2">Have questions about your build?</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              We're here to help — no pressure, no commitment.
            </p>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A3594] hover:bg-[#002EB8] text-white font-semibold rounded-xl transition-colors text-sm btn-glow">
              Talk to RCG Estates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="py-10 bg-[#F9FAFB] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4 justify-between">
          {prevPost ? (
            <Link href={`/blog/${prevPost.slug}`} className="flex items-center gap-3 group text-sm">
              <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-[#0A3594] transition-colors" />
              <div>
                <div className="text-xs text-gray-400 mb-0.5">Previous</div>
                <div className="font-medium text-[#111827] group-hover:text-[#0A3594] transition-colors line-clamp-1">
                  {prevPost.title}
                </div>
              </div>
            </Link>
          ) : <div />}

          {nextPost && (
            <Link href={`/blog/${nextPost.slug}`} className="flex items-center gap-3 group text-sm text-right">
              <div>
                <div className="text-xs text-gray-400 mb-0.5">Next</div>
                <div className="font-medium text-[#111827] group-hover:text-[#0A3594] transition-colors line-clamp-1">
                  {nextPost.title}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-[#0A3594] transition-colors" />
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
