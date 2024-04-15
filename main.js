document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('uploadForm');
    const imageInput = document.getElementById('imageInput');
    const resultsDiv = document.getElementById('results');
    $('#submit').on('click',function(e) {
        $('#loading').show();
        $('#submit').css('background-color','red');
        setTimeout(()=>{
            $('#submit').css('background-color',''); 
        },100);
        console.log("hello");
        // e.preventDefault();
    })

    imageInput.onchange = function() {
        $('#blah').show();
         var reader = new FileReader();
         reader.onload = function (e) {
            $('#blah').attr('src', e.target.result);
        }
        reader.readAsDataURL(imageInput.files[0]);
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('image', imageInput.files[0]);

        try {

            const response = await fetch('http://52.14.37.180:5006/analyze', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                $('#loading').hide();

                throw new Error('Error analyzing image');
            }

            const data = await response.json();
            console.log(response);

            if(data==""){
                $('#loading').hide();
                resultsDiv.innerHTML = "<p class='text-danger'>Please enter valid image</p>";
            }else{
                displayResults(data);

            }
        } catch (error) {
            $('#loading').hide();

            console.error(error.message);
            resultsDiv.textContent = 'Error analyzing image';
        }
    });

    function displayResults(results) {
        $('#loading').hide();

        let html = '';
        $('.hideShow').hide();
        resultsDiv.innerHTML = html;
        console.log(results.length)
        if(results.length>1){

             results.forEach(result => {
            const { emotion, position } = result;

            html='';
            html+=`<span style='font-size:35px;color:#dd6809; font-weight:700;'>${emotion}</span><br>`;
            if(emotion=="Angry"){
                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<img src="angry.png" style="height:200; width:150px;  object-fit:contain;">`;
                html += `<p>A storm of fury brews within</p>`;
            }
            if(emotion=="Disgust"){
                html += `<img src="disgusting.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>Revolting at its core.</p>`;
            }
            if(emotion=="Neutral"){
                html += `<img src="neutral.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>A calm oasis amidst chaos.</p>`;
            }
            if(emotion=="Sad"){
                html += `<img src="sad.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>Drenched in tears, yet resilient.</p>`;
            }
            if(emotion=="Surprise"){
                html += `<img src="surprise.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>Caught in the whirlwind of astonishmen.</p>`;
            }
            if(emotion=="Fear"){
                html += `<img src="fear.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>Trembling in the shadow of dread.</p>`;
            }
            if(emotion=="Happy"){
                html += `<img src="happy.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>Radiates joy like a sunbeam.</p>`;
            }
            $(resultsDiv).append(html);
           
        });

        }else{
            var emotion = results[0].emotion;
             html+=`<div class="mt-4"> <span style='font-size:35px;color:#dd6809; font-weight:700;'>${emotion}</span><br>`;
            if(emotion=="Angry"){
                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<img src="angry.png" style="height:200; width:150px;  object-fit:contain;">`;
                html += `<p>A storm of fury brews within</p>`;
            }
            if(emotion=="Disgust"){
                html += `<img src="disgusting.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>Revolting at its core.</p>`;
            }
            if(emotion=="Neutral"){
                html += `<img src="neutral.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>A calm oasis amidst chaos.</p>`;
            }
            if(emotion=="Sad"){
                html += `<img src="sad.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>Drenched in tears, yet resilient.</p>`;
            }
            if(emotion=="Surprise"){
                html += `<img src="surprise.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>Caught in the whirlwind of astonishmen.</p>`;
            }
            if(emotion=="Fear"){
                html += `<img src="fear.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>Trembling in the shadow of dread.</p>`;
            }
            if(emotion=="Happy"){
                html += `<img src="happy.png" style="height:200; width:150px;  object-fit:contain;">`;

                // html += `<p>Emotion: ${emotion}</p>`;
                html += `<p>Radiates joy like a sunbeam.</p>`;
            }
            html+='</div>';
            $(resultsDiv).html(html);
            console.log(results[0].emotion);

        }

       
    }

});

