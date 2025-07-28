export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-accent-600" />
              <span className="font-bold text-gray-900">SciVerify</span>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Decentralized scientific verification on Stacks.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Submit Paper
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Review Queue
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Governance
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          Built on Stacks. Secured by Bitcoin.
        </div>
      </div>
    </footer>
  );
}
