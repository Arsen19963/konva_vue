<template>
  <!-- The outermost container for the Konva stage (canvas). It captures mouse and touch events -->
  <v-stage
    ref="stage"
    :config="stageSize"
    @mousedown="handleStageMouseDown"
    @touchstart="handleStageMouseDown"
  >
    <!-- A layer inside the Konva stage where drawing objects are placed -->
    <v-layer ref="layer">
      <!-- Looping through the rectangles array and drawing each rectangle -->
      <v-rect
        v-for="item in rectangles"
        :key="item.id"
        :config="item"
        @transformend="handleTransformEnd"
      />
      <!-- A transformer object that enables transforming (resize, rotate) drawing objects -->
      <v-transformer ref="transformer" />
    </v-layer>
  </v-stage>
</template>

<script>
import Konva from "konva";

// Get the width and height of the window
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  data() {
    return {
      stageSize: {
        width: width, // Setting stage width to the window width
        height: height, // Setting stage height to the window height
      },
      rectangles: [
        // Array containing the configuration of rectangles
        {
          rotation: 0, // Initial rotation angle
          x: 150, // Initial x position
          y: 150, // Initial y position
          width: 100, // Rectangle width
          height: 100, // Rectangle height
          scaleX: 1, // Horizontal scaling factor
          scaleY: 1, // Vertical scaling factor
          fill: "green", // Fill color
          name: "rect2", // Unique name for the rectangle
          draggable: true, // Making the rectangle draggable
        },
      ],
      selectedShapeName: "", // Name of the selected shape (rectangle)
    };
  },
  methods: {
    // Function that updates the state of the rectangle after it has been transformed
    handleTransformEnd(e) {
      // Find the rectangle in the state using its name
      const rect = this.rectangles.find(
        (r) => r.name === this.selectedShapeName
      );
      // Update the state with the new properties of the transformed rectangle
      rect.x = e.target.x();
      rect.y = e.target.y();
      rect.rotation = e.target.rotation();
      rect.scaleX = e.target.scaleX();
      rect.scaleY = e.target.scaleY();

      // Change the fill color of the rectangle to a random color
      rect.fill = Konva.Util.getRandomColor();
    },
    // Function that handles mouse or touch start events on the stage
    handleStageMouseDown(e) {
      // If the stage itself is clicked, clear the selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = "";
        this.updateTransformer();
        return;
      }

      // If a transformer is clicked, do nothing
      const clickedOnTransformer =
        e.target.getParent().className === "Transformer";
      if (clickedOnTransformer) {
        return;
      }

      // Find the clicked rectangle by its name
      const name = e.target.name();
      const rect = this.rectangles.find((r) => r.name === name);
      if (rect) {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = "";
      }
      this.updateTransformer();
    },
    // Function to update the transformer based on the selected shape
    updateTransformer() {
      const transformerNode = this.$refs.transformer.getNode();
      const stage = transformerNode.getStage();
      const { selectedShapeName } = this;

      const selectedNode = stage.findOne("." + selectedShapeName);
      // If the selected node is already attached to the transformer, do nothing
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // Attach the transformer to the selected node
        transformerNode.nodes([selectedNode]);
      } else {
        // Remove the transformer if no node is selected
        transformerNode.nodes([]);
      }
    },
  },
};
</script>
