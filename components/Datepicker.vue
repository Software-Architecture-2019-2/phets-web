<template>
  <div>
    <b-input
      id="datepicker-trigger"
      :value="date"
      placeholder="ej: 2020-03-25"
    />
    <airbnb-style-datepicker
      trigger-element-id="datepicker-trigger"
      mode="single"
      :date-one="date"
      :min-date="isoFormat(minDate)"
      :max-date="isoFormat(maxDate)"
      :months-to-show="monthsToShow"
      @date-one-selected="setDate($event)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: undefined,
    },
    minDate: {
      type: Date,
      default: undefined,
    },
    maxDate: {
      type: Date,
      default: undefined,
    },
    monthsToShow: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      date: this.value,
    }
  },
  watch: {
    value(value) {
      this.date = value
    },
  },
  methods: {
    setDate(val) {
      this.$emit('input', val)
    },
    isoFormat(date) {
      return date ? date.toISOString() : undefined
    },
  },
}
</script>
