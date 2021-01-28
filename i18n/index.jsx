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
    homeSignedOut: {
      titlePartOne: 'Sell the One Product',
      titlePartTwo: 'that identifies yourself.',
      description: 'One9 is an online store, where people sell and buy unique items. Unlike others, we only let you sell the one piece you think represents you the most as a craftsman.',
      listItem1: 'It takes less than a minute to have your e-commerce up and running.',
      listItem2: 'You will be given a link you can share on your social platforms.',
      listItem3: 'You can decide to accept payments at any time.',
      buttonCreate: 'Create my Store',
    },
    product: {
      preview: 'Preview',
      buy: 'Buy',
      author: 'brought to you by {{author}}',
      contact: 'Contact: {{contact}}',
    },
    header: {
      fees: 'Fees',
      manage: 'Sign In',
    },
    fees: {
      title: 'Fees',
      listItem1: 'There are no monthly costs associated with One9.',
      listItem2: 'Each transaction has a standard 2.9% + ~0.3$ fee set by the payment processor',
      listItem3: 'If you\'ve created your website after January 1st 2022, our commission will be 1% on the products you will sell. If your website has been created before that date, we will never take any commission from you.',
    },
    loginModal: {
      title: 'Welcome Back!',
      error: 'The email address or password is incorrect.',
      showPassword: 'Show',
      hidePassword: 'Hide',
      createLink: 'Do you want to create your website? Click here',
      login: 'Login',
    },
    createModal: {
      title: 'Done!',
      pageAvalTitle: 'Your website is now available at this address:',
      whatsNext: 'What\'s next?',
      alertInfo: 'If you want to be able to accept payments or edit your listing, please create an Account.',
      email: 'Email',
      password: 'Password (6 characters minumum)',
      confirmPassword: 'Confirm Password',
      showPassword: 'Show',
      hidePassword: 'Hide',
      createAccount: 'Create Account',
      error: 'The email may not be valid, the passwords could be too weak or not match.',
      copiedToClipboard: 'Copied to your clipboard!',
    },
    publicProduct: {
      footer: 'Website created with',
    },
    fourOfFour: {
      title: 'Page Not Found',
      description: 'The page you were looking for might have been unpublished or deleted.',
      button: 'Return to Homepage',
    },
    components: {
      leftColumn: {
        alertInfo: 'Fill every field on this column and see how your website will look like on your right! All fields are required.',
        titleCreate: 'Create a new Website',
        titleEdit: 'Edit your Website',
        storeName: 'Store Name',
        authorName: 'Author Name',
        itemName: 'Item Name',
        itemDescription: 'Item Description',
        price: 'Price (including VAT and shipment)',
        image: 'Images',
        contactEmail: 'Contact Email',
        addressHere: 'Your address on one9',
        buttonCreate: 'Create my Website',
        buttonUpdate: 'Update my Website',
        clickOr: 'Click or',
        dropHere: 'Drop here',
        removeImage: 'Remove',
        alertNoIdAvailabilityInfo: 'Please use a different address. The current one is already used by a different store.',
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
      title: 'Il tuo sito',
      itemsSold: 'Unità vendute',
      pageViews: 'Visite pagina',
      acceptPayments: 'Accetta Pagamenti',
      editListing: 'Modifica il sito',
      hideListing: 'Nascondi il sito',
      publishListing: 'Ripubblica il sito',
      logout: 'Esci',
      share: 'Condividi',
    },
    homeSignedOut: {
      titlePartOne: 'Vendi il prodotto',
      titlePartTwo: 'che ti identifica.',
      description: 'One9 è un e-commerce minimale dove le persone possono vendere e comprare prodotti unici. Al contrario di altre piattaforme, potrai vendere il solo oggetto che più pensi rappresenti la tua attività di artigiano.',
      listItem1: 'Serve meno di un minuto per avere il tuo e-commerce online.',
      listItem2: 'Ti sarà dato un indirizzo internet che potrai condividere attraverso i tuoi social.',
      listItem3: 'Potrai decidere di accettare i pagamenti in un qualsiasi momento.',
      buttonCreate: 'Crea il mio Sito',
    },
    product: {
      preview: 'Anteprima',
      buy: 'Acquista',
      author: 'presentato da {{author}}',
      contact: 'Contatto: {{contact}}',
    },
    header: {
      fees: 'Costi',
      manage: 'Accedi',
    },
    fees: {
      title: 'Costi',
      listItem1: 'Non ci sono costi mensili ricorrenti ne costi legati alla creazione del vostro sito.',
      listItem2: 'Ogni transazione ha un costo fisso del 2.9% + ~0.25€ definito dal sistema di pagamento.',
      listItem3: 'Se hai creato il tuo sito dopo il 01/01/2022, la nostra commissione sarà del 1% sulle vendite. Se il tuo sito è stato creato prima di tale data, no ti sarà mai addebitata questa commissione.',
    },
    loginModal: {
      title: 'Ben ritornato!',
      error: 'L\'email o password inserite non sono corrette.',
      showPassword: 'Mostra',
      hidePassword: 'Nascondi',
      createLink: 'Vuoi invece creare il tuo sito? Clicca qui!',
      login: 'Accedi',
    },
    createModal: {
      title: 'Fatto!',
      pageAvalTitle: 'Il tuo sito è ora raggiungibile a questo indirizzo:',
      whatsNext: 'Ed ora?',
      alertInfo: 'Se vuoi accettare pagamenti o modificare la pagina in futuro, sei invitato a creare un Account con noi!',
      email: 'Email',
      password: 'Password (deve avere minimo 6 caratteri)',
      confirmPassword: 'Conferma la Password',
      showPassword: 'Mostra',
      hidePassword: 'Nascondi',
      createAccount: 'Crea Account',
      error: 'L\'email inserita potrebbe non essere valida, le passwords potrebbero essere troppo deboli o non coincidere tra di loro.',
      copiedToClipboard: 'Copiato!',
    },
    publicProduct: {
      footer: 'Sito creato grazie a',
    },
    fourOfFour: {
      title: 'Pagina non trovata',
      description: 'La pagina che cercavi potrebbe esser stata nascosta od eliminata.',
      button: 'Ritorna alla pagina principale',
    },
    components: {
      leftColumn: {
        alertInfo: 'Completa i campi in questa colonna e osserva l\'anteprima del tuo sito in tempo reale! Tutti i campi sono obbligatori.',
        titleCreate: 'Crea il mio Sito',
        titleEdit: 'Aggiorna il mio Sito',
        storeName: 'Nome attività',
        authorName: 'Il tuo nome',
        itemName: 'Nome oggetto',
        itemDescription: 'Descrizione oggetto',
        price: 'Prezzo (comprensivo di IVA e spedizione)',
        image: 'Immagini',
        contactEmail: 'Email di contatto',
        addressHere: 'Il tuo indirizzo su questo sito',
        buttonCreate: 'Crea',
        buttonUpdate: 'Aggiorna il mio Sito',
        clickOr: 'Clicca o',
        dropHere: 'Rilascia',
        removeImage: 'Rimuovi',
        alertNoIdAvailabilityInfo: 'Si prega di utilizzare un indirizzo differente in quanto il presente é già occupato.',
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
