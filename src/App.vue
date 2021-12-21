<script>
export default {
  data() {
    return {
      notes: [
        { id: 1, msg: "This is your first Stickynote. It's very simple." },
        {
          id: 2,
          msg: "Here's another one. These are intended for transient, simple reminders.",
        },
        { id: 3, msg: "There are no due dates, no alarms - just simple reminders." },
        {
          id: 4,
          msg: "You can add new Stickynotes by using the button at the top of the page.",
        },
        { id: 5, msg: "And you can delete notes when you are finished with them." },
      ],
    };
  },
  methods: {
    addNote() {
      let newNote = {
        id: Math.floor(Math.random() * 100),
        msg: "",
      };
      this.notes.push(newNote);
      localStorage.setItem("_stickynotes", JSON.stringify(this.notes));
    },
    deleteNote(item) {
      // if (confirm("Are you sure?")) {
      this.notes.splice(
        this.notes.findIndex((i) => {
          return i.id === item;
        }),
        1
      );
      localStorage.setItem("_stickynotes", JSON.stringify(this.notes));
      // }
    },
  },
  mounted() {
    if (localStorage.getItem("_stickynotes")) {
      try {
        this.notes = JSON.parse(localStorage.getItem("_stickynotes"));
        console.log(this.notes);
        console.log(JSON.parse(localStorage.getItem("_stickynotes")));
      } catch (e) {
        localStorage.removeItem("_stickynotes");
      }
    } else {
      const parsed = JSON.stringify(this.notes);
      localStorage.setItem("_stickynotes", parsed);
    }
  },
  watch: {
    notes: {
      handler(newNotes) {
        localStorage.setItem("_stickynotes", JSON.stringify(newNotes));
      },
      deep: true,
    },
  },
};
</script>

<template>
  <div class="container">
    <div class="flex justify-between pt-5 pb-5">
      <h1 class="text-5xl font-bold text-center text-yellow-300">Stickynotes</h1>
      <button @click="addNote" class="bg-yellow-300 hover:bg-yellow-400 text-black font-bold py-2 px-4 rounded-full">
        Add note
      </button>
    </div>
    <div class="grid grid-cols-4 mt-10 gap-4">
      <div v-for="note in notes" class="relative">
        <div class="w-full h-full bg-yellow-300">
          <div>
            <textarea class="bg-yellow-300 w-80 h-72 mt-4 ml-4" v-model="note.msg"></textarea>
            <button
              @click="deleteNote(note.id)"
              class="
                absolute
                bottom-1
                right-1
                bg-yellow-300
                hover:bg-yellow-400
                text-yellow-800
                font-bold
                py-2
                px-2
                rounded-full
              "
            >
              <v-icon name="md-deleteforever" scale="1.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
::selection {
  color: #fff176;
  background-color: black;
}
textarea {
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none;
}
</style>
