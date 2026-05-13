import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
  id: 'jalali-datepicker',
  name: 'Jalali Date Picker (انتخابگر تاریخ جلالی)',
  description: 'Persian/Jalali date and time picker for Directus (انتخابگر تاریخ و زمان فارسی/جلالی)',
  icon: 'today',
  component: InterfaceComponent,
  types: ['dateTime', 'date', 'time', 'timestamp'],
  localTypes: ['standard'],
  group: 'selection',
  options: [
    {
      field: 'use24',
      name: '24-Hour Clock (فرمت ۲۴ ساعته)',
      type: 'boolean',
      meta: {
        width: 'half',
        interface: 'boolean',
        options: {
          label: 'Use 24-hour time format',
        },
      },
      schema: {
        default_value: true,
      },
    },
    {
      field: 'includeSeconds',
      name: 'Include Seconds (نمایش ثانیه)',
      type: 'boolean',
      meta: {
        width: 'half',
        interface: 'boolean',
        options: {
          label: 'Show seconds in time picker',
        },
      },
      schema: {
        default_value: false,
      },
    },
  ],
});
