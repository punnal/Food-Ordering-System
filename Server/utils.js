function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};


function escapeEmail(email) {
    return (email || '').replace('.', ',');
}

function unescapeEmail(email) {
    return (email || '').replace(',', '.');
}


module.exports.snapshotToArray = snapshotToArray
module.exports.escapeEmail = escapeEmail
module.exports.unescapeEmail = unescapeEmail