import rosetta from 'rosetta';
import { useRouter } from 'next/router';

const i18n = rosetta({
  en: {
    home: {
      hi: 'Hi {{email}}!',
      title: 'Your Listing',
      itemsSold: 'Items Sold',
      pageViews: 'Page Views',
      acceptPayments: 'Accept Payments',
      editListing: 'Edit Listing',
      hideListing: 'Hide Listing',
      publishListing: 'Publish Listing',
      logout: 'logout',
      share: 'Share',
    },
    // support(obj) {
    //   const hour = Math.floor(Math.random() * 3) + 9;
    //   let str = `For questions, I'm available on ${obj.date.toLocaleDateString()}`;
    //   str += `, any time after ${hour}:00.`;
    //   return str;
    // },
  },
  it: {
    home: {
      hi: 'Ciao {{email}}!',
      title: 'La tua inserzione',
      itemsSold: 'Unità vendute',
      pageViews: 'Visite pagina',
      acceptPayments: 'Accetta Pagamenti',
      editListing: 'Modifica l\'inserzione',
      hideListing: 'Nascondi Inserzione',
      publishListing: 'Pubblica Inserzione',
      logout: 'Esci',
      share: 'Condividi',
    },
  },
});

const usei18n = () => {
  const router = useRouter();
  const { locale, defaultLocale } = router;

  i18n.locale(locale || defaultLocale);

  return i18n;
};

export default usei18n;
