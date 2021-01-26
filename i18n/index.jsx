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
      logout: 'Logout',
      share: 'Share',
    },
    product: {
      preview: 'Preview',
      buy: 'Buy',
      author: 'brought to you by {{author}}',
      contact: 'Contact: {{contact}}',
    },
    components: {
      leftColumn: {
        titleCreate: 'Create a new listing',
        titleEdit: 'Edit your Listing',
        storeName: 'Store Name',
        authorName: 'Author Name',
        itemName: 'Item Name',
        itemDescription: 'Item Description',
        price: 'Price (including VAT and shipment)',
        image: 'Image',
        contactEmail: 'Contact Email',
        addressHere: 'Your address on one9',
        buttonCreate: 'Create my Listing',
        buttonUpdate: 'Update my Listing',
        clickOr: 'Click or',
        dropHere: 'Drop here',
        removeImage: 'Remove',
      },
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
    product: {
      preview: 'Anteprima',
      buy: 'Acquista',
      author: 'presentato da {{author}}',
      contact: 'Contatto: {{contact}}',
    },
    components: {
      leftColumn: {
        titleCreate: 'Crea una nuova inserzione',
        titleEdit: 'Aggiorna la tua inserzione',
        storeName: 'Nome attività',
        authorName: 'Il tuo nome',
        itemName: 'Nome oggetto',
        itemDescription: 'Descrizione oggetto',
        price: 'Prezzo (comprensivo di IVA e spedizione)',
        image: 'Immagine',
        contactEmail: 'Email di contatto',
        addressHere: 'Il tuo indirizzo su questo sito',
        buttonCreate: 'Crea la mia inserzione',
        buttonUpdate: 'Aggiorna la mia inserzione',
        clickOr: 'Clicca o',
        dropHere: 'Rilascia',
        removeImage: 'Rimuovi',
      },
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
