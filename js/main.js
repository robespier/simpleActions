
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/

(function () {
    'use strict';
    var csInterface = new CSInterface();


    // fileName is a String (with the .jsx extension included)
    function loadJSX(fileName) {
        var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";
        csInterface.evalScript('$.evalFile("' + extensionRoot + fileName + '")');
    }

    function init() {
        themeManager.init();
        $("#button_1").click(function () {
            loadJSX('openFlexoFolder.jsx');
        });
        $("#button_1_1").click(function () {
            loadJSX('openJpegFolder.jsx');
        });
        $("#button_2").click(function () {
            loadJSX('openCuttingFile.jsx');
        });
        $("#button_3").click(function () {
            loadJSX('loadBlank.jsx');
        });
        $("#button_3_1").click(function () {
            loadJSX('updateBlank.jsx');
        });
        $("#button_4").click(function () {
            loadJSX('duplicateSelectedLayers.jsx');
        });
        $("#button_5").click(function () {
            loadJSX('RemoveAllGuides.jsx');
        });
        $("#button_7").click(function () {
            loadJSX('OpenMultiPagePDF.jsx');
        });
        $("#button_8").click(function () {
            loadJSX('DeleteEmptyLayers.jsx');
        });
        $("#button_9").click(function () {
            loadJSX('ImageCrop.jsx');
        });
        $("#button_10").click(function () {
            loadJSX('OffsetPathWindow.jsx');
        });
        $("#button_11").click(function () {
            loadJSX('ClippingMask.jsx');
        });
        $("#button_12").click(function () {
            loadJSX('UnclippingMask.jsx');
        });
        $("#button_13").click(function () {
            loadJSX('DeleteSmallPaths.jsx');
        });
        $("#button_14").click(function () {
            loadJSX('FitToSelectedArt.jsx');
        });
    }
    init();
}());
