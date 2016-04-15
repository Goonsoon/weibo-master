
window.onload = function () {
    var focused = false;
    var textArea = document.getElementById('TA1');
    var submitBtn = document.getElementById('submit');
    textArea.onfocus = function(){
        if(!focused){
            this.value = '';
            focused = true;
        }
    };
    textArea.onblur = function(){
        if(this.value==''){
            this.value = '说说你的想法...';
            focused = false;
        }
    };
    textArea.onkeyup = function(){
        if(this.value.length>0){
            document.getElementById('submit').setAttribute('class','enable');
        }else{
            document.getElementById('submit').setAttribute('class','disable');
        }
        var inputstat = document.getElementById('inputstat');
        var inputCount = document.getElementById('countnum');
        var inputValue = this.value.length;
        var countnum = 140-inputValue;
        if(countnum>=0){
            inputstat.innerHTML = '还可以输入';
        }else{
            inputstat.innerHTML = '已超出';
            document.getElementById('submit').setAttribute('class','disable');
            countnum = Math.abs(countnum);
        }
        inputCount.innerHTML = countnum;
    };

    submitBtn.onclick = function(){
        if(this.getAttribute('class')=='enable'){
            var newMess = document.createElement('div');
            newMess.setAttribute('class','contentArea');

            var newMessContent = document.createElement('div');
            newMessContent.setAttribute('class','content');

            var newMessZan = document.createElement('div');
            newMessZan.setAttribute('class','zan');
            newMessZan.innerHTML = "赞 <span class='zannum'>0</span>";

            var newMessTX = document.createElement('div');
            newMessTX.setAttribute('class','touxiang');

            var newMessUser = document.createElement('div');
            newMessUser.setAttribute('class','username');
            newMessUser.innerHTML = 'songbo';

            var newMessText = document.createElement('div');
            newMessText.setAttribute('class','content-inner');
            newMessText.innerHTML = textArea.value;

            newMessContent.appendChild(newMessTX);
            newMessContent.appendChild(newMessUser);
            newMessContent.appendChild(newMessText);

            newMess.appendChild(newMessContent);
            newMess.appendChild(newMessZan);
            if(document.getElementById('layout').firstElementChild.nextElementSibling){
                document.getElementById('layout').insertBefore(newMess,document.getElementById('layout').firstElementChild.nextElementSibling);
            }else{
                document.getElementById('layout').appendChild(newMess);
            }

            textArea.value='说说你的想法...';
            focused = false;
            submitBtn.setAttribute('class','disable');
            document.getElementById('countnum').innerHTML='140';
        }
    };

    document.getElementById('layout').onclick = function(e){
        if(e.target == this){return};
        if(e.target.getAttribute('class')=='zan'){
            e.stopPropagation();
            var num = Number(e.target.lastElementChild.innerHTML);
            e.target.lastElementChild.innerHTML = ++num;
        }
    }
};

