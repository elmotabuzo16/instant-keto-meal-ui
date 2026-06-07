import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-100 text-slate-700 py-10">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 text-center sm:px-6 md:grid-cols-2 md:items-start md:text-left">
        <div>
          <p className="font-semibold text-slate-900">Instant Keto Meal</p>
          <p className="text-sm text-slate-500 mt-2">© {year} Instant Keto Meal. All Rights Reserved.</p>
        </div>

        <div className="md:justify-self-end md:text-right">
          <h4 className="text-sm font-semibold text-slate-900">Disclaimer</h4>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-slate-500 md:mx-0">
            Content is for informational and educational purposes only and not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
