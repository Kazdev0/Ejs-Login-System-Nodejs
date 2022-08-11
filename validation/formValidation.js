module.exports.formValidation = (username, password) => {

    let errors = [];

    if(!username || !password){
        return errors.push({message:"Lütfen Tüm Alanları Doldurun"})
    }
    if(password.lenght <= 6) {
        return errors.push({message:"Şifre 6 Karakterden Kısa Olamaz!"})
    }
    if(username.lenght <= 3){
        return errors.push({message:"Kullanıcı Adı 3 Karakterden Kısa Olamaz"})
    }
    return errors;
}
