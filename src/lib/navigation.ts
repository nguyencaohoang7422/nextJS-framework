import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * Navigation service for programmatic routing outside of React components
 * This allows you to call router.push from anywhere (services, utilities, etc.)
 */
class NavigationService {
  private router: AppRouterInstance | null = null;

  /**
   * Initialize the navigation service with the Next.js router instance
   * This should be called once in your app layout or root component
   */
  setRouter(router: AppRouterInstance) {
    this.router = router;
  }

  /**
   * Navigate to a new route
   * @param href - The route to navigate to
   * @param options - Additional navigation options
   */
  push(href: string, options?: { scroll?: boolean }) {
    if (!this.router) {
      console.error(
        'NavigationService: Router is not initialized. Call setRouter() first.',
      );
      return;
    }
    this.router.push(href, options);
  }

  /**
   * Replace the current route
   * @param href - The route to navigate to
   * @param options - Additional navigation options
   */
  replace(href: string, options?: { scroll?: boolean }) {
    if (!this.router) {
      console.error(
        'NavigationService: Router is not initialized. Call setRouter() first.',
      );
      return;
    }
    this.router.replace(href, options);
  }

  /**
   * Navigate back in the browser history
   */
  back() {
    if (!this.router) {
      console.error(
        'NavigationService: Router is not initialized. Call setRouter() first.',
      );
      return;
    }
    this.router.back();
  }

  /**
   * Navigate forward in the browser history
   */
  forward() {
    if (!this.router) {
      console.error(
        'NavigationService: Router is not initialized. Call setRouter() first.',
      );
      return;
    }
    this.router.forward();
  }

  /**
   * Refresh the current route
   */
  refresh() {
    if (!this.router) {
      console.error(
        'NavigationService: Router is not initialized. Call setRouter() first.',
      );
      return;
    }
    this.router.refresh();
  }

  /**
   * Prefetch a route for faster navigation
   * @param href - The route to prefetch
   */
  prefetch(href: string) {
    if (!this.router) {
      console.error(
        'NavigationService: Router is not initialized. Call setRouter() first.',
      );
      return;
    }
    this.router.prefetch(href);
  }
}

// Export a singleton instance

export const navigator = new NavigationService();
