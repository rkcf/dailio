import { Validator } from 'vee-validate'

const dictionary = {
  en: {
    attributes: {
      taskName: 'task name'
    }
  }
}

Validator.localize(dictionary)
