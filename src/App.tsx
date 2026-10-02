import React, { useState, useEffect } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { CoreFeatures } from './components/CoreFeatures';
import { MoreFeatures } from './components/MoreFeatures';
import { TrustedBy } from './components/TrustedBy';
import { AISection } from './components/AISection';
import { Support } from './components/Support';
import { Metrics } from './components/Metrics';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { PricingPage } from './components/pricing/PricingPage';

const API_URL = 'http://localhost:5000';

interface FacebookPage {
  id: string;
  name: string;
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  // Facebook states
  const [selectedPage, setSelectedPage] = useState<FacebookPage | null>(null);
  const [message, setMessage] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState('');
  const [publishError, setPublishError] = useState('');

  useEffect(() => {
    const handleNavigation = () => {
      setCurrentPath(window.location.pathname);
      setCurrentHash(window.location.hash);
    };

    window.addEventListener('popstate', handleNavigation);
    window.addEventListener('hashchange', handleNavigation);

    return () => {
      window.removeEventListener('popstate', handleNavigation);
      window.removeEventListener('hashchange', handleNavigation);
    };
  }, []);

  // =====================================================
  // PUBLISH FACEBOOK POST
  // =====================================================

  const publishToFacebook = async () => {
    if (!selectedPage) {
      setPublishError('Please select a Facebook Page.');
      return;
    }

    if (!message.trim()) {
      setPublishError('Please enter a message.');
      return;
    }

    setPublishing(true);
    setPublishSuccess('');
    setPublishError('');

    try {
      const response = await fetch(
        `${API_URL}/api/auth/facebook/post`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageId: selectedPage.id,
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.details?.error?.message ||
          data.error ||
          'Failed to publish post.'
        );
      }

      setPublishSuccess(
        `Post published successfully! Post ID: ${data.postId}`
      );

      setMessage('');
    } catch (error) {
      console.error('Facebook publishing error:', error);

      setPublishError(
        error instanceof Error
          ? error.message
          : 'Failed to publish post.'
      );
    } finally {
      setPublishing(false);
    }
  };

  // =====================================================
  // FACEBOOK CALLBACK
  // =====================================================

  if (currentPath === '/facebook/callback') {
    const params = new URLSearchParams(window.location.search);
    const pagesParam = params.get('pages');

    let pages: FacebookPage[] = [];

    try {
      if (pagesParam) {
        pages = JSON.parse(pagesParam);
      }
    } catch (error) {
      console.error('Failed to parse Facebook pages:', error);
    }

    // ===================================================
    // POST COMPOSER
    // ===================================================

    if (selectedPage) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#1877F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl font-bold">
                  f
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900">
                Create Facebook Post
              </h1>

              <p className="text-gray-500 mt-2">
                Publishing to{' '}
                <span className="font-semibold text-gray-700">
                  {selectedPage.name}
                </span>
              </p>
            </div>

            {/* Selected Page */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-500">
                Selected Page
              </p>

              <p className="font-semibold text-gray-900 mt-1">
                {selectedPage.name}
              </p>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Post Message
              </label>

              <textarea
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  setPublishError('');
                  setPublishSuccess('');
                }}
                placeholder="Write something you want to publish on Facebook..."
                rows={6}
                className="w-full border border-gray-200 rounded-xl p-4 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent resize-none"
              />
            </div>

            {/* Success */}
            {publishSuccess && (
              <div className="mt-4 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 text-sm">
                {publishSuccess}
              </div>
            )}

            {/* Error */}
            {publishError && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
                {publishError}
              </div>
            )}

            {/* Publish */}
            <button
              onClick={publishToFacebook}
              disabled={publishing}
              className="w-full mt-6 py-3.5 bg-[#1877F2] hover:bg-[#166fe5] disabled:bg-gray-400 text-white font-semibold rounded-xl transition"
            >
              {publishing
                ? 'Publishing...'
                : 'Publish to Facebook'}
            </button>

            {/* Change Page */}
            <button
              onClick={() => {
                setSelectedPage(null);
                setPublishSuccess('');
                setPublishError('');
              }}
              className="w-full mt-3 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition"
            >
              ← Change Facebook Page
            </button>

          </div>
        </div>
      );
    }

    // ===================================================
    // FACEBOOK PAGE SELECTION
    // ===================================================

    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#1877F2] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl font-bold">
                f
              </span>
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Facebook Connected
            </h1>

            <p className="text-gray-500 mt-2">
              Select a Facebook Page to continue.
            </p>
          </div>

          {/* Pages */}
          {pages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                No Facebook Pages were found.
              </p>

              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="mt-4 px-5 py-2.5 bg-gray-900 text-white rounded-lg"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => {
                    setSelectedPage(page);
                    setMessage('');
                    setPublishSuccess('');
                    setPublishError('');
                  }}
                  className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-[#1877F2] hover:bg-blue-50 transition text-left"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      {page.name}
                    </p>

                    <p className="text-sm text-gray-400">
                      Page ID: {page.id}
                    </p>
                  </div>

                  <span className="text-[#1877F2] font-medium">
                    Select →
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Back */}
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            className="w-full mt-6 py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50"
          >
            Back
          </button>

        </div>
      </div>
    );
  }

  // =====================================================
  // NORMAL WEBSITE
  // =====================================================

  return (
    <div
      className="min-h-screen bg-white text-gray-900"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <Nav />

      {currentHash === '#pricing' ? (
        <PricingPage />
      ) : (
        <main className="pt-16">
          <Hero />
          <TrustedBy />
          <CoreFeatures />
          <MoreFeatures />
          <AISection />
          <Support />
          <Metrics />
          <CTA />
        </main>
      )}

      <Footer />
    </div>
  );
}