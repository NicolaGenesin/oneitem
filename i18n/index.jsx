import rosetta from 'rosetta';
import { useRouter } from 'next/router';

const i18n = rosetta({
  en: {
    intro: {
      welcome: 'Welcome, {{username}}!',
      text: 'I hope you find this useful.',
    },
    support(obj) {
      const hour = Math.floor(Math.random() * 3) + 9;
      let str = `For questions, I'm available on ${obj.date.toLocaleDateString()}`;
      str += `, any time after ${hour}:00.`;
      return str;
    },
  },
  it: {
    intro: {
      welcome: 'Ciao beo, {{username}}!',
      text: 'I hope you find this useful.',
    },
    support(obj) {
      const hour = Math.floor(Math.random() * 3) + 9;
      let str = `For questions, I'm available on ${obj.date.toLocaleDateString()}`;
      str += `, any time after ${hour}:00.`;
      return str;
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
