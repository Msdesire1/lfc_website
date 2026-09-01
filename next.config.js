/**
 * Next.js configuration.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /**
   * Short, memorable paths to the two sign-in screens.
   *
   * The administrator console has no link anywhere on the public site, which is
   * intentional — a "Staff login" in the footer only tells strangers where the
   * door is. But nobody can be expected to remember
   * /onboarding/admin either, so /admin gets them there. It is the first thing
   * anyone types when they are looking for it.
   *
   * `permanent: false` on purpose. A permanent redirect is a 308, which browsers
   * cache more or less forever; if /admin ever needs to become a real page, every
   * machine that had visited it once would keep bouncing. A 307 costs nothing and
   * can be taken back.
   */
  async redirects() {
    return [
      { source: "/admin", destination: "/onboarding/admin", permanent: false },
      // The same courtesy for students, since /login is what people try first.
      { source: "/login", destination: "/onboarding/login", permanent: false },
      { source: "/register", destination: "/onboarding/register", permanent: false },
    ];
  },
};

export default nextConfig;
