export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout will be used by Clerk middleware to protect these routes
  // For now, it's a simple pass-through
  return <>{children}</>;
}