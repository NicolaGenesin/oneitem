import rosetta from 'rosetta';
import { useRouter } from 'next/router';

const i18n = rosetta({
  en: {
    home: {
      hi: 'Hi {{storeName}}!',
      title: 'Your Products',
      itemsSold: 'Total Items Sold',
      pageViews: 'Total Page Views',
      acceptPayments: 'Enable Payments',
      createNewListing: 'Add new Product',
      changeStoreName: 'Change Your Website',
      editListing: 'Edit',
      seeListing: 'View',
      hideListing: 'Hide',
      publishListing: 'Publish',
      logout: 'Logout',
    },
    homeSignedOut: {
      titlePartOne: 'Create your online',
      titlePartTwo: 'shop — in a minute',
      inputLeftAddon: 'Your Store Name',
      listItem1: 'Let\'s take it easy - shops shouldn\'t be complicated.',
      listItem2: 'Add your products and share them through the platform you like the most.',
      listItem3: 'Enable payments at any time.',
      buttonCreate: 'Add my first product',
    },
    about: {
      title1: 'Hi',
      description1: 'I am Nicola and I am an entrepreneur and computer scientist. I\'ve created ezyou, a minimal online store creator, because I\'ve witnessed people spending dozens of hours trying to set up online shops or spending a fortune paying a dedicated agency for an overengineered solution. Unlike others, I am providing you only with the essential tools to bootstrap your online presence from scratch.',
      title2: 'Ok, but what does it mean for my business?',
      description2: 'After spending no more than a minute to add your first product, your customers will be able to see and buy it on a page like',
      description2link: 'this one',
      title3: 'Ok, but is it safe?',
      description3: 'The only informations this platform stores are the ones needed to create the product pages. The payment platform (Stripe) handles all the payment information and, by design, you will be the only entity to have have full control over it.',
    },
    product: {
      preview: 'Preview',
      buy: 'Buy',
      author: 'brought to you by {{author}}',
      contact: 'Contact: {{contact}}',
    },
    header: {
      pricing: 'Pricing',
      manage: 'Sign In',
      aboutus: 'About',
    },
    pricing: {
      zero: '$0',
      every: 'every month',
      listItem1: 'No listing fees',
      listItem2: '2.9% + ~$0.3 fee per transaction set by our payment processor',
      listItem3: 'Full access to the platform',
      listItem4: 'Unlimited shareable product links',
      footer1: 'If you\'ve created your ezyou shop after January 1st 2022, our commission will be 1% on each transaction. If your ezyou shop has been created before that date, this won\'t apply to you.',
      button: 'Get Started',
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
      pageAvalTitle: 'Your product page is now available at this address:',
      whatsNext: 'What\'s next?',
      alertInfo: 'If you want to enable payments, edit or add more listings, please consider creating an account. All you need is an email and a password.',
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
      footer: 'Created with',
    },
    fourOfFour: {
      title: 'Page Not Found',
      description: 'The page you were looking for might have been unpublished or deleted.',
      button: 'Return to Homepage',
    },
    components: {
      leftColumn: {
        alertInfo: 'Fill every field on this column and see how your website will look like on your right! All fields are required.',
        titleCreate: 'Add a new product',
        titleEdit: 'Edit your Website',
        storeName: 'Store Name',
        authorName: 'Author Name',
        itemName: 'Item Name',
        itemDescription: 'Item Description',
        price: 'Price (including VAT and shipment)',
        image: 'Images (up to 6)',
        contactEmail: 'Contact Email',
        addressHere: 'Your address on ezyou',
        buttonCreate: 'Add',
        buttonUpdate: 'Update',
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
      hi: 'Ciao {{storeName}}!',
      title: 'I tuoi prodotti',
      itemsSold: 'Unità vendute',
      pageViews: 'Visite Totali',
      acceptPayments: 'Accetta Pagamenti',
      createNewListing: 'Aggiungi nuovo prodotto',
      changeStoreName: 'Cambia il tuo indirizzo',
      editListing: 'Modifica il sito',
      seeListing: 'Vedi il sito',
      hideListing: 'Nascondi il sito',
      publishListing: 'Ripubblica il sito',
      logout: 'Esci',
    },
    homeSignedOut: {
      titlePartOne: 'Vendi il prodotto',
      titlePartTwo: 'che ti identifica.',
      description: 'ezyou è un e-commerce minimale dove le persone possono vendere e comprare prodotti unici. Al contrario di altre piattaforme, potrai vendere il solo oggetto che più pensi rappresenti la tua attività di artigiano.',
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
      pricing: 'Costi',
      manage: 'Accedi',
    },
    pricing: {
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

  i18n.locale('en' || defaultLocale);

  return i18n;
};

export default usei18n;
