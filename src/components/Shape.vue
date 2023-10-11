<template>
  <div
    id="container"
    @contextmenu="onContextMenu($event)"
    @transformend="handleTransformEnd"
    @mousedown="handleStageMouseDown"
    @touchstart.passive="handleStageMouseDown"
  ></div>
</template>

<script>
// import Konva from "konva";

export default {
  name: "KonvaDemo",

  data() {
    return {
      width: "",
      height: "",
      color: "",
      generalBox: null,
      transformer: null,
      selectedShape: null,
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
    stage.on("mousedown and touchstart", this.handleStageMouseDown);
    const layer = new Konva.Layer();
    const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

    this.transformer = new Konva.Transformer();
    layer.add(this.transformer);

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
        document.body.classList.add("pointer-cursor");
      });

      box.on("mouseout", () => {
        document.body.classList.remove("pointer-cursor");
      });

      box.on("contextmenu", (e) => {
        const clickedBox = e.target;
        this.generalBox = clickedBox;
      });

      //The new one
      box.on("dragmove", (e) => {
        const movedBox = e.target;
        movedBox.x(e.target.x());
        movedBox.y(e.target.y());
        movedBox.rotation(e.target.rotation());
        movedBox.scaleX(e.target.scaleX());
        movedBox.scaleY(e.target.scaleY());
      });

      if (colors[i]) {
        this.generalBox = box;
      }

      layer.add(box);
    }

    stage.add(layer);
  },
  methods: {
    // The new one 2
    handleTransformEnd(e) {
      const box = this.selectedShape;
      if (box) {
        // Detach the transformer first
        this.transformer.detach();

        // Now update the properties of the box
        box.x(e.target.x());
        box.y(e.target.y());
        box.rotation(e.target.rotation());
        box.scaleX(e.target.scaleX());
        box.scaleY(e.target.scaleY());
        box.fill(Konva.Util.getRandomColor());

        // Wait for Vue's next rendering cycle to complete before reattaching the transformer
        this.$nextTick(() => {
          this.transformer.nodes([box]);
          this.transformer.getLayer().batchDraw();
        });
        console.log("box", this.box);
      }
    },

    // Old code
    // handleStageMouseDown(e) {
    //   const stage = this.transformer.getStage();

    //   if (e.target === stage) {
    //     this.selectedShape = null;
    //     this.updateTransformer();
    //     return;
    //   }

    //   if (e.target instanceof Konva.Transformer) {
    //     return;
    //   }

    //   if (e.target instanceof Konva.Shape) {
    //     this.selectedShape = e.target;
    //   }

    //   this.updateTransformer();
    // },

    // updateTransformer() {
    //   const transformerNode = this.transformer;
    //   const stage = transformerNode.getStage();
    //   const selectedNode = this.selectedShape;

    //   if (selectedNode === transformerNode.node()) {
    //     return;
    //   }

    //   if (selectedNode) {
    //     transformerNode.nodes([selectedNode]);
    //   } else {
    //     transformerNode.nodes([]);
    //   }
    // },

    // The new one
    handleStageMouseDown(e) {
      const stage = this.transformer.getStage();

      if (e.target === stage) {
        this.selectedShape = null;
        this.updateTransformer();
        return;
      }

      if (e.target instanceof Konva.Transformer) {
        return;
      }

      if (e.target instanceof Konva.Shape) {
        this.selectedShape = e.target;
        this.updateTransformer();
      }
    },

    // The new one
    updateTransformer() {
      if (this.selectedShape) {
        this.transformer.nodes([this.selectedShape]);
      } else {
        this.transformer.nodes([]);
      }
      this.transformer.getLayer().batchDraw();
    },

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
<style>
.pointer-cursor {
  cursor: pointer;
}
</style>
