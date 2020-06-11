function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            document.getElementById('inicio').hidden = true;
            document.getElementById('photo1').hidden = false;
            document.getElementById('photo1').src = e.target.result;
            document.getElementById('nom_foto').style.color = '#000000';

            document.getElementById('nom_foto').innerHTML = document.getElementById('foto').files[0].name;
        };

        reader.readAsDataURL(input.files[0]);
    }
}