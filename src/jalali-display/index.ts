import { defineDisplay } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';

export default defineDisplay({
  id: 'jalali-formatter',
  name: 'نمایشگر تاریخ جلالی',
  icon: 'calendar_today',
  description:
    'تبدیل و نمایش تاریخ میلادی به شمسی/جلالی | Convert Gregorian dates to Jalali (Persian) calendar',
  component: DisplayComponent,
  options: [
    {
      field: 'format',
      name: 'فرمت تاریخ',
      type: 'string',
      meta: {
        width: 'full',
        interface: 'select-dropdown',
        options: {
          choices: [
            { text: 'jYYYY/jMM/jDD (۱۴۰۳/۰۱/۱۵)', value: 'jYYYY/jMM/jDD' },
            {
              text: 'jDD jMMMM jYYYY (۱۵ فروردین ۱۴۰۳)',
              value: 'jDD jMMMM jYYYY',
            },
            { text: 'jYYYY-jMM-jDD (۱۴۰۳-۰۱-۱۵)', value: 'jYYYY-jMM-jDD' },
            { text: 'jDD/jMM/jYYYY (۱۵/۰۱/۱۴۰۳)', value: 'jDD/jMM/jYYYY' },
            {
              text: 'jYYYY/jMM/jDD HH:mm (۱۴۰۳/۰۱/۱۵ ۱۴:۳۰)',
              value: 'jYYYY/jMM/jDD HH:mm',
            },
            {
              text: 'jDD jMMMM jYYYY - HH:mm (۱۵ فروردین ۱۴۰۳ - ۱۴:۳۰)',
              value: 'jDD jMMMM jYYYY - HH:mm',
            },
            {
              text: 'نسبی (۲ روز پیش، یک هفته پیش)',
              value: 'relative',
            },
          ],
        },
        note: 'فرمت نمایش تاریخ جلالی (j برای جلالی، M برای ماه، D برای روز، Y برای سال)',
      },
      schema: {
        default_value: 'jYYYY/jMM/jDD',
      },
    },
  ],
  types: ['string', 'date', 'dateTime', 'timestamp'],
  localTypes: ['standard'],
});
