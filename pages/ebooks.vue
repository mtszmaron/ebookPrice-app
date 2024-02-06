<template>
  <div
    id="main"
    class="w-full min-h-screen flex flex-col items-center justify-start pb-[100px] relative bg-[#151719] text-[#d9e3ea]"
  >
    <div>
      <div class="text-white bg-[#0c0b17] pt-12 px-8 pb-3 justify-start flex">
        <a href="/" class="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
          <span>Back</span>
        </a>
        <div class="flex justify-center text-3xl align-center mb-8 w-full">
          <div class="flex-1 text-end">
            <span
              class="pb-2 cursor-pointer"
              :class="{ 'border-b border-blue-500': tableType === 'request' }"
              @click="changeTableType('request')"
              >Request</span
            >
          </div>
          <div class="w-[1px] bg-white mx-2"></div>
          <div class="flex-1">
            <span
              class="pb-2 cursor-pointer"
              :class="{ 'border-b border-blue-500': tableType === 'database' }"
              @click="changeTableType('database')"
              >Database</span
            >
          </div>
        </div>
      </div>
      <div v-if="tableType === 'request'" class="py-4 px-3 max-w-[1200px]">
        <div
          class="grid grid-cols-[40px_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] border border-white"
        >
          <div class="py-2 px-4 border-r border-white">#</div>
          <div class="py-2 px-4 border-r border-white">Author</div>
          <div class="py-2 px-4 border-r border-white">Title</div>
          <div class="py-2 px-4 border-r border-white">Price</div>
          <div class="py-2 px-4 border-r border-white">Currency</div>
          <div class="py-2 px-4 border-r border-white">Release date</div>
          <div class="py-2 px-4 border-r border-white">Price PLN</div>
          <div class="py-2 px-4 border-r border-white">Ex. rate</div>
          <div class="py-2 px-4">Table no.</div>
        </div>
        <div
          v-if="ebookRequestList.length === 0"
          class="text-2xl font-semibold ml-8 mt-2"
        >
          No data
        </div>
        <div
          v-for="(ebook, index) in ebookRequestList"
          v-else
          :key="index"
          class="grid grid-cols-[40px_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-l border-r border-white"
          :class="{ 'bg-gray-800': index % 2 === 0 }"
        >
          <div class="py-2 px-4 border-r border-white">{{ index + 1 }}</div>
          <div class="py-2 px-4 border-r border-white">{{ ebook.name }}</div>
          <div class="py-2 px-4 border-r border-white">{{ ebook.title }}</div>
          <div class="py-2 px-4 border-r border-white">{{ ebook.price }}</div>
          <div class="py-2 px-4 border-r border-white">{{ ebook.curr }}</div>
          <div class="py-2 px-4 border-r border-white">{{ ebook.date }}</div>
          <div class="py-2 px-4 border-r border-white">
            {{ ebook.fromNBP.pricePLN }}
          </div>
          <div class="py-2 px-4 border-r border-white">
            {{ ebook.fromNBP.rate }}
          </div>
          <div class="py-2 px-4">{{ ebook.fromNBP.tableNo }}</div>
        </div>
      </div>
      <div
        v-else-if="tableType === 'database'"
        class="py-4 px-3 max-w-[1200px]"
      >
        <div
          class="grid grid-cols-[40px_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] border border-white"
        >
          <div class="py-2 px-4 border-r border-white">#</div>
          <div class="py-2 px-4 border-r border-white">Author</div>
          <div class="py-2 px-4 border-r border-white">Title</div>
          <div class="py-2 px-4 border-r border-white">Price</div>
          <div class="py-2 px-4 border-r border-white">Currency</div>
          <div class="py-2 px-4 border-r border-white">Release date</div>
          <div class="py-2 px-4 border-r border-white">Price PLN</div>
          <div class="py-2 px-4 border-r border-white">Ex. rate</div>
          <div class="py-2 px-4">Table no.</div>
        </div>
        <div
          v-if="ebookDBList.length === 0"
          class="text-2xl font-semibold ml-8 mt-2"
        >
          No data
        </div>
        <div
          v-for="(ebook, index) in ebookDBList"
          v-else
          :key="index"
          class="grid grid-cols-[40px_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-l border-r border-white"
          :class="{ 'bg-gray-800': index % 2 === 0 }"
        >
          <div class="py-2 px-4 border-r border-white flex justify-center">
            {{ index + 1 }}
          </div>
          <div class="py-2 px-4 border-r border-white">{{ ebook.name }}</div>
          <div class="py-2 px-4 border-r border-white">{{ ebook.title }}</div>
          <div class="py-2 px-4 border-r border-white">{{ ebook.price }}</div>
          <div class="py-2 px-4 border-r border-white">{{ ebook.curr }}</div>
          <div class="py-2 px-4 border-r border-white">{{ ebook.date }}</div>
          <div class="py-2 px-4 border-r border-white">
            {{ ebook.fromNBP.pricePLN }}
          </div>
          <div class="py-2 px-4 border-r border-white">
            {{ ebook.fromNBP.rate }}
          </div>
          <div class="py-2 px-4">{{ ebook.fromNBP.tableNo }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      tableType: 'request',
      ebookRequestList: [],
      ebookDBList: [],
    }
  },
  async mounted() {
    this.ebookRequestList = this.$store.state.requestData
    console.log('data: ' + this.$store.state.requestData)

    const response = await axios.get('api/ebooks')

    this.ebookDBList = response.data
    console.log('Odpowiedź z serwera:', response.data)
  },
  methods: {
    changeTableType(type) {
      this.tableType = type
    },
  },
}
</script>
