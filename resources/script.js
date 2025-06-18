$('#togglePassword').click(function () { 
    const input = $('#pass');
    const type = input.attr('type') === 'password' ? 'text' : 'password';
    input.attr('type', type);
    const icon = $('#togglePassword')
    const typei = icon.attr('class')==='bi-eye-slash'? 'bi-eye' : 'bi-eye-slash';
    icon.attr('class',typei)
});


function validatePassword(password) {
        const minLength = 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecialChar = /[!@#\$%\^\&*\)\(+=._-]/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long.";
        }
        if (!hasUppercase) {
            return "Password must include at least one uppercase letter.";
        }
        if (!hasLowercase) {
            return "Password must include at least one lowercase letter.";
        }
        if (!hasNumber) {
            return "Password must include at least one number.";
        }
        if (!hasSpecialChar) {
            return "Password must include at least one special character.";
        }

        return "Valid";
}


$('#SignUp').click(function(){
    if(validatePassword($('#pass').val())==="Valid"){
        $('#SignUpForm').submit()
    }else{
        alert(validatePassword($('#pass').val()))
    }
  

})
$(document).ready(function () {
    if ($('#WarningPara').is(':visible')) {
        console.log('Visible');
        setTimeout(function () {
            $('#WarningPara').hide();
        }, 10000);
    }
});
