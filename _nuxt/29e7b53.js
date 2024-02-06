(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{300:function(r,e,t){"use strict";t.r(e);t(41);var o=t(12),d=(t(65),t(82)),v=t.n(d),_={data:function(){return{tableType:"request",ebookRequestList:[],ebookDBList:[]}},mounted:function(){var r=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.ebookRequestList=r.$store.state.requestData,console.log("data: "+r.$store.state.requestData),e.next=4,v.a.get("api/ebooks");case 4:t=e.sent,r.ebookDBList=t.data,console.log("Odpowiedź z serwera:",t.data);case 7:case"end":return e.stop()}}),e)})))()},methods:{changeTableType:function(r){this.tableType=r}}},l=t(49),component=Object(l.a)(_,(function(){var r=this,e=r._self._c;return e("div",{staticClass:"w-full min-h-screen flex flex-col items-center justify-start pb-[100px] relative bg-[#151719] text-[#d9e3ea]",attrs:{id:"main"}},[e("div",[e("div",{staticClass:"text-white bg-[#0c0b17] pt-12 px-8 pb-3 justify-start flex"},[e("a",{staticClass:"cursor-pointer",attrs:{href:"/"}},[e("svg",{staticClass:"w-6 h-6",attrs:{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor"}},[e("path",{attrs:{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"}})]),r._v(" "),e("span",[r._v("Back")])]),r._v(" "),e("div",{staticClass:"flex justify-center text-3xl align-center mb-8 w-full"},[e("div",{staticClass:"flex-1 text-end"},[e("span",{staticClass:"pb-2 cursor-pointer",class:{"border-b border-blue-500":"request"===r.tableType},on:{click:function(e){return r.changeTableType("request")}}},[r._v("Request")])]),r._v(" "),e("div",{staticClass:"w-[1px] bg-white mx-2"}),r._v(" "),e("div",{staticClass:"flex-1"},[e("span",{staticClass:"pb-2 cursor-pointer",class:{"border-b border-blue-500":"database"===r.tableType},on:{click:function(e){return r.changeTableType("database")}}},[r._v("Database")])])])]),r._v(" "),"request"===r.tableType?e("div",{staticClass:"py-4 px-3 max-w-[1200px]"},[r._m(0),r._v(" "),0===r.ebookRequestList.length?e("div",{staticClass:"text-2xl font-semibold ml-8 mt-2"},[r._v("\n        No data\n      ")]):r._l(r.ebookRequestList,(function(t,o){return e("div",{key:o,staticClass:"grid grid-cols-[40px_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-l border-r border-white",class:{"bg-gray-800":o%2==0}},[e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v(r._s(o+1))]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v(r._s(t.name))]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v(r._s(t.title))]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v(r._s(t.price))]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v(r._s(t.curr))]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v(r._s(t.date))]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("\n          "+r._s(t.fromNBP.pricePLN)+"\n        ")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("\n          "+r._s(t.fromNBP.rate)+"\n        ")]),r._v(" "),e("div",{staticClass:"py-2 px-4"},[r._v(r._s(t.fromNBP.tableNo))])])}))],2):"database"===r.tableType?e("div",{staticClass:"py-4 px-3 max-w-[1200px]"},[r._m(1),r._v(" "),0===r.ebookDBList.length?e("div",{staticClass:"text-2xl font-semibold ml-8 mt-2"},[r._v("\n        No data\n      ")]):r._l(r.ebookDBList,(function(t,o){return e("div",{key:o,staticClass:"grid grid-cols-[40px_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] border-b border-l border-r border-white",class:{"bg-gray-800":o%2==0}},[e("div",{staticClass:"py-2 px-4 border-r border-white flex justify-center"},[r._v("\n          "+r._s(o+1)+"\n        ")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v(r._s(t.name))]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v(r._s(t.title))]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v(r._s(t.price))]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v(r._s(t.curr))]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v(r._s(t.date))]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("\n          "+r._s(t.fromNBP.pricePLN)+"\n        ")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("\n          "+r._s(t.fromNBP.rate)+"\n        ")]),r._v(" "),e("div",{staticClass:"py-2 px-4"},[r._v(r._s(t.fromNBP.tableNo))])])}))],2):r._e()])])}),[function(){var r=this,e=r._self._c;return e("div",{staticClass:"grid grid-cols-[40px_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] border border-white"},[e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("#")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Author")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Title")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Price")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Currency")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Release date")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Price PLN")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Ex. rate")]),r._v(" "),e("div",{staticClass:"py-2 px-4"},[r._v("Table no.")])])},function(){var r=this,e=r._self._c;return e("div",{staticClass:"grid grid-cols-[40px_1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] border border-white"},[e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("#")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Author")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Title")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Price")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Currency")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Release date")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Price PLN")]),r._v(" "),e("div",{staticClass:"py-2 px-4 border-r border-white"},[r._v("Ex. rate")]),r._v(" "),e("div",{staticClass:"py-2 px-4"},[r._v("Table no.")])])}],!1,null,null,null);e.default=component.exports}}]);