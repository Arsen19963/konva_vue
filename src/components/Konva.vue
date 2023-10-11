<template>
  <div id="container" @contextmenu="onContextMenu($event)"></div>
</template>

<script>
export default {
  name: "KonvaDemo",

  data() {
    return {
      width: "", // Added this property
      height: "", // Added this property
      color: "", // Added this property
      generalBox: null,
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

      box.on("contextmenu", (e) => {
        const clickedBox = e.target;
        this.generalBox = clickedBox;
      });

      if (colors[i]) {
        this.generalBox = box;
      }

      layer.add(box);
    }

    stage.add(layer);
  },
  methods: {
    moveToTop() {
      if (this.generalBox) {
        this.generalBox.moveToTop();
      }
    },
    moveToBottom() {
      if (this.generalBox) {
        this.generalBox.moveToBottom();
      }
    },
    moveUp() {
      if (this.generalBox) {
        this.generalBox.moveUp();
      }
    },
    moveDown() {
      if (this.generalBox) {
        this.generalBox.moveDown();
      }
    },
    setZIndex() {
      if (this.generalBox) {
        this.generalBox.setZIndex(3);
      }
    },
    onContextMenu(e, clickedBox) {
      //prevent the browser's default menu
      e.preventDefault();

      //show your menu
      this.$contextmenu({
        x: e.x,
        y: e.y,
        items: [
          {
            label: "A submenu",
            children: [
              {
                label: "Move to Top",
                onClick: () => {
                  this.moveToTop(clickedBox);
                },
              },
              {
                label: "Move to Bottom",
                onClick: () => {
                  this.moveToBottom(clickedBox);
                },
              },
              {
                label: "Move Up",
                onClick: () => {
                  this.moveUp(clickedBox);
                },
              },
              {
                label: "Move Down",
                onClick: () => {
                  this.moveDown(clickedBox);
                },
              },
              {
                label: "Set Z Index to 3",
                onClick: () => {
                  this.setZIndex(clickedBox);
                },
              },
            ],
          },
        ],
      });
    },
  },
};
</script>
