async function copydiscord() {
    try {
        await navigator.clipboard.writeText('Xissayala#5557');
        ds.style.display='block';
        setTimeout("ds.style.display='none'", 2000);
    }
    catch (err) {
        console.error('Ошибка: ', err);
        alert('Xissayala#5557')
    }
}