exports.showImage= showImage;
exports.mais1= mais1;


function showImage(name, type){
    if(type=='image/png'|| type=='image/jpeg')
        var ficheiro = '<img src="/fileStore/'+name+'" width="80%"/>'
    else
        var ficheiro=$('<p>'+name+','+type+'</p>')

    var fileObj=$( `

    <div class="w3-row w3-margin-bottom">
        <div class="w3-col s6">
            ${ficheiro}
        </div>
        <div class="w3-col s6 w3-border">
            <p>Filename: ${name}</p>
            <p>MimeType :${type}</p>
        </div>
    </div>

    `)
    
    var download = $('<div><a href="/files/download/'+name+'">Download</a></div>')
    $("#display").empty()
    $("#display").append(fileObj,download)
    $("#display").modal()
}

function mais1(){
    console.log("aqui")
    var p1 =$(`
    <div class="w3-row w3-margin-bottom">
        <div class="w3-col s3">
            <label class="w3-text-teal"><b>Select file</b></label>
        </div>
        <div class = "w3-col s9 w3-border">
            <input class="w3-input w3-border w3-light-grey" type="file" name="myFile" multiple>
        </div>
    </div>
    <div class="w3-row w3-margin-bottom">
    <div class="w3-col s3">
        <label class="w3-text-teal"><b>Description</b></label>
    </div>
    <div class = "w3-col s9 w3-border">
        <input class="w3-input w3-border w3-light-grey" type="text" name="desc" multiple>
    </div>
</div>
    `)


    $("#form").append(p1)

}