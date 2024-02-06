<template>
  <div
    id="main"
    class="w-full min-h-screen flex flex-col items-center justify-start pb-[100px] relative bg-[#151719] text-[#d9e3ea]"
  >
    <div class="text-white bg-[#0c0b17] py-12 px-8 rounded-b-xl max-w-[500px]">
      <div class="flex justify-center text-3xl align-center mb-8">
        <div class="flex-1 text-end">
          <span
            class="pb-2 cursor-pointer"
            :class="{ 'border-b border-blue-500': inputType === 'input' }"
            @click="changeInputType('input')"
            >Input</span
          >
        </div>
        <div class="w-[1px] bg-white mx-2"></div>
        <div class="flex-1">
          <span
            class="pb-2 cursor-pointer"
            :class="{ 'border-b border-blue-500': inputType === 'textarea' }"
            @click="changeInputType('textarea')"
            >Textarea</span
          >
        </div>
      </div>
      <div v-if="inputType === 'input'">
        <div
          class="flex justify-between items-center border-b border-x-gray-500 pb-3"
        >
          <div>
            <h1 class="text-3xl font-bold mb-2">Ebook Form</h1>
            <h4>Type in author name and his ebook title</h4>
          </div>
          <button
            type="button"
            class="border border-blue-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded h-8 flex justify-center items-center"
            @click="addFields"
          >
            Add
          </button>
        </div>
        <form @submit.prevent="submitForm(formItems)">
          <div
            v-for="(item, index) in formItems"
            :key="index"
            class="mb-6 flex flex-col"
          >
            <div class="flex border-dashed border-gray-700">
              <div class="font-semibold text-xl">Ebook {{ index + 1 }}</div>
              <button
                v-if="index !== 0"
                type="button"
                class="ml-2 px-1 rounded border border-red-500 text-white hover:bg-red-500 flex items-center justify-center text-xs"
                @click="removeFields(index)"
              >
                - Delete
              </button>
            </div>
            <div class="flex">
              <div class="flex flex-col mr-3">
                <label for="author" class="">Author:</label>
                <input
                  id="author"
                  v-model="item.author"
                  type="text"
                  name="author"
                  required
                  class="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:bg-gray-700 mt-1"
                />
              </div>
              <div>
                <label for="title" class="">Title:</label>
                <div class="flex">
                  <input
                    id="title"
                    v-model="item.title"
                    type="text"
                    name="title"
                    required
                    class="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:bg-gray-700 mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div v-else-if="inputType === 'textarea'">
        <div
          class="flex justify-between items-center border-b border-x-gray-500 pb-3"
        >
          <div>
            <h1 class="text-3xl font-bold mb-2">Ebook Form</h1>
            <h4>Type in list of ebook authors and titles</h4>
          </div>
        </div>
        <form
          class="flex flex-col"
          @submit.prevent="formatEbookList(ebookList)"
        >
          <label for="ebookList" class="font-semibold text-xl mb-2"
            >Ebook List:</label
          >
          <textarea
            id="ebookList"
            v-model="ebookList"
            class="mb-6 bg-black rounded border border-gray-700 text-white"
            rows="4"
            cols="50"
          ></textarea>
          <div class="flex justify-end">
            <button
              type="submit"
              class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      inputType: 'input',
      formItems: [{ author: '', title: '' }],
      ebookList: null,
    }
  },
  methods: {
    addFields() {
      this.formItems.push({ author: '', title: '' })
    },
    removeFields(index) {
      this.formItems.splice(index, 1)
    },
    changeInputType(type) {
      this.inputType = type
    },
    formatEbookList(ebookList) {
      ebookList = ebookList.trim().replace(/^"|"$/g, '')
      const lines = ebookList.split('\n')
      const resultList = lines.map((line) => {
        const cleanLine = line.replace(/(\\&quot;)|"|\\/g, '')
        const [author, title] = cleanLine.split(',')
        return { author, title }
      })
      this.submitForm(resultList)
    },

    async submitForm(items) {
      // Tutaj możesz umieścić logikę wysyłania formularza
      const response = await axios.post('api/ebooks', items)

      console.log('Odpowiedź z serwera:', response.data)
      this.$store.commit('setMyData', response.data)
      this.$router.push('/ebooks')
    },
  },
}
</script>
