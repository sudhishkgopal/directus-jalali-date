declare module 'vue3-persian-datetime-picker' {
  import { DefineComponent } from 'vue';

  interface DatePickerProps {
    modelValue?: string | null;
    type?: 'date' | 'datetime' | 'time' | 'year-month' | 'year' | 'month';
    format?: string;
    displayFormat?: string;
    placeholder?: string;
    editable?: boolean;
    autoSubmit?: boolean;
    clearable?: boolean;
    simple?: boolean;
    color?: string;
    min?: string;
    max?: string;
    disabled?: boolean;
    locale?: string;
  }

  interface DatePickerEmits {
    change: (value: string | null) => void;
    open: () => void;
    close: () => void;
    'update:modelValue': (value: string | null) => void;
  }

  const DatePicker: DefineComponent<DatePickerProps, DatePickerEmits>;
  export default DatePicker;
}

declare module 'moment-jalali' {
  import * as moment from 'moment';
  export = moment;
}
