import { defineDisplay } from '@directus/extensions-sdk';
import DisplayComponent from './display.vue';

export default defineDisplay({
  id: 'jalali-formatter',
  name: 'Jalali Date Display (نمایشگر تاریخ جلالی)',
  icon: 'calendar_today',
  description:
    'Convert and display Gregorian dates as Jalali (Persian) calendar (تبدیل و نمایش تاریخ میلادی به شمسی/جلالی)',
  component: DisplayComponent,
  options: [
    {
      field: 'format',
      name: 'Date Format (فرمت تاریخ)',
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
              text: 'Relative (نسبی) — e.g. 2 days ago (۲ روز پیش)',
              value: 'relative',
            },
          ],
        },
        note: 'Jalali display format. Use j-prefixed tokens: jYYYY=year, jMM=month, jDD=day. (فرمت نمایش تاریخ جلالی)',
      },
      schema: {
        default_value: 'jYYYY/jMM/jDD',
      },
    },
  ],
  types: ['string', 'date', 'dateTime', 'timestamp'],
  localTypes: ['standard'],
});
