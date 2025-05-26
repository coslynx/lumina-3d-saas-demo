import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../hooks/useTheme';

interface MinimalLayoutProps extends React.PropsWithChildren<{}> {}

/**
 * Component that provides a minimal layout structure for the application.
 *
 * @component
 * @example
 * <MinimalLayout>
 *   <Content />
 * </MinimalLayout>
 */
const MinimalLayout: React.FC<MinimalLayoutProps> = ({ children }) => {
  const { isDarkMode } = useTheme();

  /**
   * Renders the layout with header, main content, and footer.
   *
   * @returns JSX.Element - The layout structure.
   */
  return (
    <div className="app-container min-h-screen flex flex-col dark:bg-gray-900 bg-white text-gray-800 dark:text-gray-200">
      <Header />
      <main className="main-content flex-1 container mx-auto py-8 px-4 md:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MinimalLayout;