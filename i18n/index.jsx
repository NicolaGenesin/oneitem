import rosetta from 'rosetta';
import { useRouter } from 'next/router';

const i18n = rosetta({
  en: {
    home: {
      hi: 'Hi {{storeName}}!',
      title: 'Your Products',
      itemsSold: 'Total Items Sold',
      pageViews: 'Total Page Views',
      acceptPayments: 'Enable payments',
      updateBankDetails: 'Update my bank details',
      pendingStripeVerification: 'Your banking data is being verified, please return here in a few minutes. Once you\'re verified, your products can be bought.',
      linkToStripe: 'Go to the payments dashboard',
      createNewListing: 'Add new product',
      logout: 'Logout',
      item: {
        updatedOn: 'updated on',
        share: 'Share:',
        editListing: 'Edit',
        seeListing: 'View',
        hideListing: 'Hide',
        publishListing: 'Publish',
        published: 'published',
        unpublished: 'unpublished',
      },
    },
    homeSignedOut: {
      titlePartOne: 'Create your online',
      titlePartTwo: 'shop — in a minute',
      inputLeftAddon: 'Your Store Name',
      listItem1: 'Let\'s make it easy - an ecommerce shouldn\'t be complicated.',
      listItem2: 'Add your products and share them through the platform you like the most.',
      listItem3: 'Enable payments at any time.',
      buttonCreate: 'Add my first product',
      nameNotAvailable: 'Please use a different name. The current one is already used by a different registered Store.',
    },
    about: {
      title1: 'Hi',
      description1: 'I am Nicola, a computer scientist from Italy. I\'ve created ezyou, a minimal online store creator, because I\'ve witnessed people spending dozens of hours trying to set up online shops or spending a fortune paying a dedicated agency for an overengineered solution. Unlike others, I am giving you only the essential tools to bootstrap your online presence from scratch.',
      title2: 'Ok, but what does it mean for my business?',
      description2: 'After spending no more than a minute to add your first product, your customers will be able to see and buy it on a page like',
      description2link: 'this one',
      title3: 'Ok, but is it safe?',
      description3: 'The only informations this platform stores are the ones needed to create the product pages. The payment platform (Stripe) handles all the payment information and, by design, you will be the only entity to have have full control on it.',
    },
    product: {
      preview: 'Preview',
      buy: 'Buy',
      author: 'Brought to you by {{author}}',
      contact: 'Contact: {{contact}}',
      authorPlaceholder: '[Author name]',
      contactPlaceholder: '[Email or phone number]',
      descriptionPlaceholder: '[Product description]',
      namePlaceholder: '[Product name]',
      pricingInformation: 'VAT included, postage included',
      descriptionTitle: 'Description',
      deliveredIn(product) {
        let range;

        if (product.deliveryEstimateRange === 'weeks') {
          range = product.deliveryEstimateValue == 1 ? 'week' : 'weeks';
        } else {
          range = product.deliveryEstimateValue == 1 ? 'day' : 'days';
        }

        return `Delivered in ${product.deliveryEstimateValue} ${range}`;
      },
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
      button: 'Get Started',
    },
    loginModal: {
      title: 'Welcome Back!',
      error: 'The email address or password is incorrect.',
      showPassword: 'Show',
      hidePassword: 'Hide',
      createLink: 'Do you want to create your ecommerce? Click here',
      login: 'Login',
    },
    createModal: {
      title: 'Done!',
      pageAvalTitle: 'Your product page is now available at this address:',
      whatsNext: 'What\'s next?',
      alertInfo: 'If you want to accept payments, edit or add more listings, please consider creating an account. All you need is an email and a password.',
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
    payment: {
      success: {
        title: 'Thank you for your purchase!',
        subtitle: 'Your order has been received',
        description: 'You will receive shortly an order confirmation email with details of your order.',
        button: 'Return to Product Page',
      },
      issue: {
        title: 'Something went wrong!',
        subtitle: 'The checkout process has been interrupted or payment has been declined',
        description: 'Please try again later.',
        button: 'Return to Product Page',
      },
    },
    components: {
      leftColumn: {
        alertInfo: 'Please fill all fields on this column. After clicking on the create button at the bottom of the page, your page will be online and visible to everyone.',
        titleCreate: 'Add a new product',
        titleEdit: 'Edit your Website',
        authorName: 'Author Name',
        itemName: 'Item Name',
        itemDescription: 'Item Description',
        price: 'Price (including VAT and shipment)',
        quantity: 'Availability (number of items)',
        deliveryEstimate: 'Delivery time (estimated)',
        deliveryEstimateRangeDay: 'day',
        deliveryEstimateRangeDays: 'days',
        deliveryEstimateRangeWeek: 'week',
        deliveryEstimateRangeWeeks: 'weeks',
        image: 'Images (up to 6)',
        contactEmail: 'Contact Email (or phone number)',
        buttonCreate: 'Add',
        buttonUpdate: 'Update',
        clickOr: 'Click or',
        dropHere: 'Drop here',
        removeImage: 'Remove',
        buttonUpdateLoading: 'Please Wait',
      },
    },
    feedback: {
      title: 'Feedback? Need help? ☝️',
      description: 'If you need a feature, found a bug, need help, or have feedback, write it here. I\'ll build the feature / fix the bug for you!',
      email: 'Your email (optional)',
      message: 'Your message',
      submit: 'Send Feedback',
      close: 'Close',
      thankYou: 'Thank You! ❤️',
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
      itemsSold: 'Totale prodotti venduti',
      pageViews: 'Visite totali',
      acceptPayments: 'Abilita Pagamenti',
      updateBankDetails: 'Aggiorna i miei dati bancari',
      pendingStripeVerification: 'I tuoi dati sono in fase di verifica, si prega di tornare fra qualche minuto. Al termine della fase di verifica, i tuoi prodotti potranno essere comprati.',
      linkToStripe: 'Vai alla pagina dei Pagamenti',
      createNewListing: 'Aggiungi nuovo Prodotto',
      logout: 'Esci',
      item: {
        updatedOn: 'aggiornato il',
        share: 'Condividi:',
        hideListing: 'Nascondi',
        seeListing: 'Visualizza',
        publishListing: 'Pubblica',
        editListing: 'Modifica',
        published: 'pubblicato',
        unpublished: 'invisibile',
      },
    },
    homeSignedOut: {
      titlePartOne: 'Crea il tuo ecommerce',
      titlePartTwo: '— in un minuto',
      inputLeftAddon: 'Nome della tua attività',
      listItem1: 'Relax - un ecommerce deve essere semplice da usare.',
      listItem2: 'Aggiungi i tuoi prodotti e condividili attraverso la piattaforma che desideri.',
      listItem3: 'Abilita i pagamenti in un qualsiasi momento.',
      buttonCreate: 'Aggiungi il mio primo prodotto',
      nameNotAvailable: 'Per piacere usa un nome differente in quanto quello inserito è già in uso da un altra attività registrata.',
    },
    about: {
      title1: 'Ciao',
      description1: 'Mi chiamo Nicola e sono un informatico italiano. Ho creato ezyou, un creatore di ecommerce minimale, perchè ho assistito ad artigiani spendere decine di ore nel tentare di crearsi un eccommerce online o (peggio) pagare agenzie migliaia di euro per una soluzione esagerata. Al contrario di altri, la mia piattaforma ti darà solo gli strumenti assolutamente essenziali per far partire la tua presenza online.',
      title2: 'Ok, ma cosa significa?',
      description2: 'Dopo aver speso circa un minuto per aggiungere il tuo primo prodotto, i tuoi clienti saranno in grado di vederlo attraverso una pagina come',
      description2link: 'questa',
      title3: 'Ok, ma è sicuro?',
      description3: 'ezyou salva solo le informazioni necessarie per creare le pagine prodotti. La piattaforma di pagamenti utilizzata (Stripe) gestisce tutti gli estremi di pagmento e, per design, tu sarai l\'unica persona ad averne pieno accesso.',
    },
    product: {
      preview: 'Anteprima',
      buy: 'Compra',
      author: 'Presentato da {{author}}',
      contact: 'Contatto: {{contact}}',
      authorPlaceholder: '[Nome autore]',
      contactPlaceholder: '[Email o recapito telefonico]',
      descriptionPlaceholder: '[Descrizione prodotto]',
      namePlaceholder: '[Nome prodotto]',
      pricingInformation: 'IVA e spedizione incluse',
      descriptionTitle: 'Descrizione',
      deliveredIn(product) {
        let range;

        if (product.deliveryEstimateRange === 'weeks') {
          range = product.deliveryEstimateValue == 1 ? 'settimana' : 'settimane';
        } else {
          range = product.deliveryEstimateValue == 1 ? 'giorno' : 'giorni';
        }

        return `Spedito in ${product.deliveryEstimateValue} ${range}`;
      },
    },
    header: {
      pricing: 'Prezzi',
      manage: 'Entra',
      aboutus: 'Info',
    },
    pricing: {
      zero: '€0',
      every: 'ogni mese',
      listItem1: 'Nessun costo applicato alla creazione di un inserzione',
      listItem2: 'Tassa del 2.9% + ~€0.3 per ogni transazione definita dalla piattaforma di pagamenti',
      listItem3: 'Pieno accesso alla piattaforma',
      listItem4: 'Generazione illimitata di prodotti e links',
      button: 'Inizia ora',
    },
    loginModal: {
      title: 'Bentornato!',
      error: 'L\'indirizzo email o la password non sono corretti.',
      showPassword: 'Mostra',
      hidePassword: 'Nascondi',
      createLink: 'Vuoi creare il tuo ecommerce? Clicca qui',
      login: 'Accedi',
    },
    createModal: {
      title: 'Fatto!',
      pageAvalTitle: 'La tua pagina prodotto è ora disponibile a questo indirizzo internet:',
      whatsNext: 'Ed ora?',
      alertInfo: 'Se vuoi accettare pagamenti, modificare o aggiungere altri prodotti, considera la creazione di un account. Tutto ciò di cui hai bisogno è una email e una password.',
      email: 'Email',
      password: 'Password (minimo di 6 caratteri)',
      confirmPassword: 'Conferma Password',
      showPassword: 'Mostra',
      hidePassword: 'Nascondi',
      createAccount: 'Crea Account',
      error: 'L\'indirizzo email potrebbe non essere valido, le password potrebbero essere troppo deboli o non corrispondono.',
      copiedToClipboard: 'Copiato nelle note! Incolla dove preferisci e vedi il risultato',
    },
    publicProduct: {
      footer: 'pagina creata grazie a',
    },
    fourOfFour: {
      title: 'Pagina non trovata',
      description: 'La pagina che stavi cercando potrebbe esser stata nascosta od eliminata.',
      button: 'Ritorna alla pagina principale',
    },
    payment: {
      success: {
        title: 'Grazie per il tuo acquisto!',
        subtitle: 'Il tuo ordine è stato ricevuto',
        description: 'Riceverai a breve una conferma d\'ordine via email.',
        button: 'Ritorna alla pagina prodotto',
      },
      issue: {
        title: 'Qualcosa è andato storto!',
        subtitle: 'Il processo di acquisto è stato interrotto oppure il pagamento è stato declinato.',
        description: 'Si prega di riprovare più tardi.',
        button: 'Ritorna alla pagina prodotto',
      },
    },
    components: {
      leftColumn: {
        alertInfo: 'Completa tutti i campi in questa colonna. Dopo aver cliccato il bottone in basso, il tuo ecommerce sarà visibile a tutti.',
        titleCreate: 'Aggiungi un nuovo prodotto',
        titleEdit: 'Modifica il prodotto',
        storeName: 'Store Name',
        authorName: 'Nome produttore',
        itemName: 'Nome prodotto',
        itemDescription: 'Descrizione Prodotto',
        price: 'Prezzp (inclusivo di IVA e spedizione)',
        quantity: 'Disponibilità (numero di prodotti)',
        deliveryEstimate: 'Tempo di spedizione (stimato)',
        deliveryEstimateRangeDay: 'giorno',
        deliveryEstimateRangeDays: 'giorni',
        deliveryEstimateRangeWeek: 'settimana',
        deliveryEstimateRangeWeeks: 'settimane',
        image: 'Immagini (fino a 6)',
        contactEmail: 'Email di contatto (o numero di telefono)',
        buttonCreate: 'Aggiungi',
        buttonUpdate: 'Aggiorna',
        clickOr: 'Clicca o',
        dropHere: 'rilascia qui',
        removeImage: 'Rimuovi',
        buttonUpdateLoading: 'Attendi',
      },
    },
    feedback: {
      title: 'Feedback? Serve aiuto?',
      description: 'Se pensi sia interessante una feature, hai trovato un problema, hai bisogno di assistenza, o vuoi condividere una tua opinione, scrivimi qui. Farò del mio meglio per accontentarti!',
      email: 'La tua email',
      message: 'Il tuo messaggio',
      submit: 'Invia Feedback',
      close: 'Chiudi',
      thankYou: 'Grazie Mille! ❤️',
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
