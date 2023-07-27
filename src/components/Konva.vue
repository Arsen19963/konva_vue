<template>
  <div>
    <div id="container" @contextmenu="onContextMenu($event)"></div>
    <!-- <div id="buttons">
      <button @click="moveToTop">Move yellow box to top</button>
      <button @click="moveToBottom">Move yellow box to bottom</button>
      <button @click="moveUp">Move yellow box up</button>
      <button @click="moveDown">Move yellow box down</button>
      <button @click="setZIndex">Set yellow box zIndex to 3</button>
    </div> -->
  </div>
</template>

<script>
import ContextMenu from "@imengyu/vue3-context-menu";
export default {
  name: "KonvaDemo",
  data() {
    return {
      yellowBox: null,
    };
  },
  mounted() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const stage = new Konva.Stage({
      container: "container",
      width,
      height,
    });

    const layer = new Konva.Layer();
    const offsetX = 0;
    const offsetY = 0;
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

    // onClickOutside

    for (let n = 0; n < 6; n++) {
      const i = n;
      const box = new Konva.Rect({
        x: i * 30 + 210,
        y: i * 18 + 40,
        width: 100,
        height: 50,
        fill: colors[i],
        stroke: "black",
        strokeWidth: 4,
        draggable: true,
        name: colors[i],
      });

      box.on("mouseover", () => {
        document.body.style.cursor = "pointer";
      });

      box.on("mouseout", () => {
        document.body.style.cursor = "default";
      });

      if (colors[i] === "yellow") {
        this.yellowBox = box;
      }

      layer.add(box);
    }

    stage.add(layer);
  },
  methods: {
    moveToTop() {
      if (this.yellowBox) {
        this.yellowBox.moveToTop();
      }
    },
    moveToBottom() {
      if (this.yellowBox) {
        this.yellowBox.moveToBottom();
      }
    },
    moveUp() {
      if (this.yellowBox) {
        this.yellowBox.moveUp();
      }
    },
    moveDown() {
      if (this.yellowBox) {
        this.yellowBox.moveDown();
      }
    },
    setZIndex() {
      if (this.yellowBox) {
        this.yellowBox.setZIndex(3);
      }
    },
    onContextMenu(e: MouseEvent) {
      //prevent the browser's default menu
      e.preventDefault();
      //show your menu
      this.$contextmenu({
        x: e.x,
        y: e.y,
        items: [
          {
            label: "A menu item",
            onClick: () => {
              alert("You click a menu item");
            },
          },
          {
            label: "A submenu",
            children: [
              { label: "Item1" },
              { label: "Item2" },
              { label: "Item3" },
            ],
          },
        ],
      });
    },
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #f0f0f0;
}
#buttons {
  border: 1px solid black;
  position: fixed;
  left: 10px;
  top: 0px;
}
button {
  margin-top: 10px;
  display: block;
}
</style>
