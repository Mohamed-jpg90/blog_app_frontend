export const metadata = {
  title: "My Blogs",
  description:
    "Manage your published articles — edit content, update cover images, or delete posts from your Blog Space account.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  alternates: {
    canonical: "/myBlogs",
  },
};

export default function MyBlogsLayout({ children }) {
  return <>{children}</>;
}