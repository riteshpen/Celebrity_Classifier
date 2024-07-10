Dropzone.autoDiscover = false;

function init() {
    console.log("Initializing Dropzone...");

    let dz = new Dropzone("#dropzone", {
        url: "/",
        maxFiles: 1,
        addRemoveLinks: true,
        dictDefaultMessage: "Drop files here or click to upload",
        autoProcessQueue: false,
        init: function() {
            console.log("Dropzone initialized");
        }
    });

    dz.on("addedfile", function(file) {
        console.log("File added:", file);
        if (dz.files[1] != null) {
            dz.removeFile(dz.files[0]);
        }
    });

    $("#submitBtn").on('click', function(e) {
        e.preventDefault(); // Prevent default form submission
        console.log("Submit button clicked");

        // Sample response data
        let sampleData = [
            {
                class: "elon_musk",
                class_probability: [2.05, 10.67, 15.00, 5.5, 66.78],
                class_dictionary: {
                    bob_ross: 0,
                    elon_musk: 1
                }
            }
        ];

        let match = sampleData[0];
        let classDictionary = match.class_dictionary;

        $("#error").hide();
        $("#resultHolder").show();
        $("#divClassTable").show();

        // Display matched class
        $("#resultHolder").html($(`[data-player="${match.class}"]`).html());

        // Update probability scores in the table
        for (let personName in classDictionary) {
            let index = classDictionary[personName];
            let probabilityScore = match.class_probability[index];
            let elementName = "#score_" + personName;
            $(elementName).html(probabilityScore.toFixed(2) + '%');
        }
    });
}

$(document).ready(function() {
    console.log("Document ready");
    $("#error").hide();
    $("#resultHolder").hide();
    $("#divClassTable").hide();

    init();
});
