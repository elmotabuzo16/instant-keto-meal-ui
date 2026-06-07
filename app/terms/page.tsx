import type { ReactElement } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { APP_NAME } from '@/lib/config';
import { buildSeoMetadata, defaultSeoDescription } from '@/lib/seo';

type TermsSection = {
  title: string;
  body: ReactElement;
};

const brand = APP_NAME;

const termsSections: TermsSection[] = [
  {
    title: '1. Your Account',
    body: (
      <>
        If you create an account on <strong>{brand}</strong>, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with <strong>{brand}</strong>. You must immediately notify <strong>{brand}</strong> of any unauthorized uses of your account or any other breaches of security. <strong>{brand}</strong> will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.
      </>
    ),
  },
  {
    title: '2. Responsibility of Contributors',
    body: (
      <>
        <p>
          When you submit data, images, files, and other material to <strong>{brand}</strong>, or otherwise make material available by means of <strong>{brand}</strong>, you are entirely responsible for the content of, and any harm resulting from, that content.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>The downloading, copying, and use of the content will not infringe the proprietary rights of any third party.</li>
          <li>You have complied with any third-party licenses relating to the content.</li>
          <li>The content does not contain viruses, malware, or other harmful or destructive content.</li>
          <li>The content is not spam, machine-generated, misleading, unlawful, or designed to manipulate search rankings.</li>
          <li>The content is not pornographic, does not contain threats or incite violence, and does not violate privacy or publicity rights.</li>
          <li>The content is not promoted through unwanted messages, spam links, or similar unsolicited methods.</li>
          <li>The content is not named in a manner that misleads readers into thinking you are another person or company.</li>
        </ul>
      </>
    ),
  },
  {
    title: '3. Content Posted on Other Websites',
    body: (
      <>
        We have not reviewed, and cannot review, all of the material made available through websites and webpages to which <strong>{brand}</strong> links, and that link to <strong>{brand}</strong>. <strong>{brand}</strong> does not control those websites and is not responsible for their contents or their use. You are responsible for taking precautions to protect yourself and your systems from harmful or destructive content.
      </>
    ),
  },
  {
    title: '4. Advertisements',
    body: (
      <>
        <strong>{brand}</strong> reserves the right to display advertisements on <strong>{brand}</strong>.
      </>
    ),
  },
  {
    title: '5. Copyright Infringement and DMCA Policy',
    body: (
      <>
        As <strong>{brand}</strong> asks others to respect its intellectual property rights, it respects the intellectual property rights of others. If you believe that material located on or linked to by <strong>{brand}</strong> violates your copyright, you are encouraged to notify <strong>{brand}</strong>. <strong>{brand}</strong> may remove infringing material, disable links, or terminate access for repeat infringers where appropriate.
      </>
    ),
  },
  {
    title: '6. Intellectual Property',
    body: (
      <>
        This Agreement does not transfer from <strong>{brand}</strong> to you any <strong>{brand}</strong> or third-party intellectual property. All right, title, and interest in and to such property will remain solely with <strong>{brand}</strong> or its licensors. Your use of <strong>{brand}</strong> grants you no right or license to reproduce or otherwise use any third-party trademarks.
      </>
    ),
  },
  {
    title: '7. Termination',
    body: (
      <>
        <strong>{brand}</strong> may terminate your access to all or any part of <strong>{brand}</strong> at any time, with or without cause, with or without notice, effective immediately. If you wish to terminate this Agreement or your account, you may discontinue using <strong>{brand}</strong>. Provisions that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
      </>
    ),
  },
  {
    title: '8. Disclaimer of Warranties',
    body: (
      <>
        <strong>{brand}</strong> is provided "as is." <strong>{brand}</strong> and its suppliers and licensors disclaim all warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. <strong>{brand}</strong> does not warrant that the service will be error free or that access will be continuous or uninterrupted. Information posted on <strong>{brand}</strong> may not be accurate or current.
      </>
    ),
  },
  {
    title: '9. Limitation of Liability',
    body: (
      <>
        In no event will <strong>{brand}</strong>, or its suppliers or licensors, be liable with respect to any subject matter of this Agreement under any contract, negligence, strict liability, or other legal or equitable theory for special, incidental, or consequential damages; the cost of procurement for substitute products or services; interruption of use; loss or corruption of data; or amounts exceeding the fees paid by you to <strong>{brand}</strong> during the twelve months before the cause of action. This limitation does not apply where prohibited by law.
      </>
    ),
  },
  {
    title: '10. Medical Disclaimer',
    body: (
      <>
        You are responsible for your own health. <strong>{brand}</strong> is offered for educational and informational purposes only, and does not diagnose, cure, or treat any medical or other condition. Always seek the advice of your physician or other qualified health provider before changing your diet or exercise plan and with any questions you may have regarding a medical condition. Although we do our best to verify the accuracy of information, we cannot guarantee its accuracy.
      </>
    ),
  },
  {
    title: '11. Permitted Uses',
    body: (
      <>
        If you have a serious medical condition, including but not limited to pregnancy, diabetes, high blood pressure, cancer, or heart disorders, you may not use <strong>{brand}</strong> without the prior approval and supervision of your physician or other licensed healthcare provider. If you suffer from anorexia nervosa, bulimia, or other related eating disorders, you are not permitted to use <strong>{brand}</strong>. You must be at least 16 years of age to use <strong>{brand}</strong>.
      </>
    ),
  },
  {
    title: '12. General Representation and Warranty',
    body: (
      <>
        You represent and warrant that your use of <strong>{brand}</strong> will comply with this Agreement and all applicable laws and regulations, and that your use of <strong>{brand}</strong> will not infringe or misappropriate the intellectual property rights of any third party.
      </>
    ),
  },
  {
    title: '13. Indemnification',
    body: (
      <>
        You agree to indemnify and hold harmless <strong>{brand}</strong>, its contractors, licensors, and their respective directors, officers, employees, and agents from and against any and all claims and expenses, including attorneys' fees, arising out of your use of <strong>{brand}</strong>, including but not limited to your violation of this Agreement.
      </>
    ),
  },
  {
    title: '14. Miscellaneous',
    body: (
      <>
        This Agreement constitutes the entire agreement between <strong>{brand}</strong> and you concerning the subject matter hereof. It may only be modified by a written amendment signed by an authorized representative of <strong>{brand}</strong>, or by the posting of a revised version. This Agreement will be binding upon and will inure to the benefit of the parties, their successors, and permitted assigns.
      </>
    ),
  },
];

export const metadata = buildSeoMetadata({
  title: `Terms and Conditions | ${APP_NAME}`,
  description: defaultSeoDescription,
  path: '/terms',
});

export default function TermsPage(): ReactElement {
  return (
    <>
      <Header />
      <main className="flex-1 bg-zinc-50 text-slate-950">
        <section className="bg-[#F4F2F0]">
          <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase tracking-[0.24em] text-[#4A2518]">
              Terms
            </p>
            <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Terms and Conditions
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600">
              Thank you for taking the time to read our terms of service. By using our service, you agree to comply with the terms and conditions listed below.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="text-sm leading-7 text-slate-700">
              <p>
                The following terms and conditions govern all use of the <strong>{brand}</strong> website, mobile applications, and all content, services, and products available at or through the website and mobile applications. <strong>{brand}</strong> is offered subject to your acceptance without modification of all terms and conditions contained herein and all other operating rules, policies, and procedures that may be published from time to time.
              </p>
              <p className="mt-4">
                Please read this Agreement carefully before accessing or using <strong>{brand}</strong>. By accessing or using any part of the website or mobile applications, you agree to become bound by the terms and conditions of this Agreement. If you do not agree to all the terms and conditions, you may not access <strong>{brand}</strong> or use any services.
              </p>
            </div>

            <div className="mt-10 space-y-8">
              {termsSections.map((section) => (
                <section key={section.title}>
                  <h2 className="font-serif text-2xl font-semibold text-slate-950">
                    {section.title}
                  </h2>
                  <div className="mt-3 text-sm leading-7 text-slate-700">
                    {section.body}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
