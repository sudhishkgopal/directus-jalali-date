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
  options: null,
});
