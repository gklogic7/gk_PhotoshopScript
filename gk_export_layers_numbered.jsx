

if (app.documents.length === 0) {
    alert("No document open!");
} else {

    var doc = app.activeDocument;
    var outputFolder = Folder.selectDialog("Select folder to save PNGs");

    if (outputFolder != null) {

        var originalVisibility = [];
        var count = 1;

        // Save visibility and hide all layers
        for (var i = 0; i < doc.layers.length; i++) {
            originalVisibility[i] = doc.layers[i].visible;
            doc.layers[i].visible = false;
        }

        // 🔽 LOOP FROM BOTTOM TO TOP
        for (var i = doc.layers.length - 1; i >= 0; i--) {
            var layer = doc.layers[i];

            if (layer.typename === "ArtLayer") {
                layer.visible = true;

                // 01, 02, 03...
                var number = (count < 10) ? "0" + count : count;
                var fileName = number + "_" + layer.name + ".png";

                var file = new File(outputFolder + "/" + fileName);

                var pngOptions = new PNGSaveOptions();
                pngOptions.compression = 9;
                pngOptions.interlaced = false;

                doc.saveAs(file, pngOptions, true, Extension.LOWERCASE);

                layer.visible = false;
                count++;
            }
        }

        // Restore original visibility
        for (var i = 0; i < doc.layers.length; i++) {
            doc.layers[i].visible = originalVisibility[i];
        }

        alert("Export completed (Bottom → Top)!");
        var win = new Window("palette", "Exporting...");
        var img = File("E:\Krishna_Bornhi\BHI_krishProj_26\Adobe_Photoshop_Script"); // static image
        win.add("image", undefined, img);
        win.show();
    }
}
