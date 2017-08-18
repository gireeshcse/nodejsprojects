To set Cookie in browser
document.cookie="test=Test Cookie"

To set cookie at express
res.cookie('IndexCookie', 'This was set from Index');

To clear cookies
res.clearCookie('IndexCookie');

Sessions require secret