# internet-and-applications
Web project for Internet &amp; Applications Appathon


## Περιγραφή του Project
Ο χρήστης θα αναζητεί δύο πόλεις του κόσμου και θα του εμφανίζονται δεδομένα για τον καιρό στις δύο πόλεις αυτές, καθώς και πληροφορίες για την οδική μετάβαση από
τη μία στην άλλη. Τα δεδομένα του καιρού θα περιέχουν τη θερμοκρασία, την υγρασία και τις τρέχουσες συνθήκες που θα συλλέγονται εκείνη τη στιγμή από το API του
https://openweathermap.org, ενώ η εύρεση της διαδρομής μεταξύ των δύο πόλεων θα γίνεται μέσω του API του https://openrouteservice.org/. Η εφαρμογή θα
παρουσιάζει επίσης στον χρήστη ημερήσια πρόβλεψη για τις επόμενες 7 ημέρες για την πόλη προορισμού του, προκειμένου να μπορεί να προετοιμαστεί κατάλληλα.


## Τεχνολογίες που χρησιμοποιήθηκαν
Το Project αναπτύχθηκε εξ ολοκλήρου στη βιβλιοθήκη **React** της **JavaScript**. Επιπλέον από τη React, χρησιμοποιήθηκε η βιβλιοθήκη [Bootstrap 3](https://getbootstrap.com/docs/3.3/) για την ευκολότερη και αποτελεσματικότερη μορφοποίηση των περιεχομένων, η βιβλιοθήκη [Leaflet](https://leafletjs.com/) της JavaScript για την εμφάνιση κκαι προσαρμογή του χάρτη, καθώς επίσης και η βιβλιοθήκη [moment](https://momentjs.com/) της Javascript για την λήψη της τρέχουσας ημερομηνίας και τον υπολογισμό της ημερομηνίας των 7 επόμενων ημερών. Στην παράγραφο [Installation](https://github.com/manosvek/internet-and-applications/blob/master/README.md#installation) φαίνεται ο τρόπος στησίματος ενός Ubuntu μηχανήματος προκειμένου να μπορέσει να τρέξει η εφαρμογή.


## Βίντεο παρουσίασης της εφαρμογής
Η παρακάτω εικόνα περιέχει έναν σύνδεσμο με το βίντεο ανεβασμένο στο YouTube.

[![Video Presentation](http://img.youtube.com/vi/ez8kCSYwF8U/0.jpg)](http://www.youtube.com/watch?v=ez8kCSYwF8U "Video Title")

Σε περίπτωση που για κάποιο λόγο δεν οδηγεί η παραπάνω εικόνα στο YouTube, παρέχεται και ο [σύνδεσμος](https://www.youtube.com/watch?v=ez8kCSYwF8U) του βίντεο.


## Installation
Για να τρέξει η εφαρμογή, αρχικά χρειάζεται να εγκαταστήσουμε την πλατφόρμα Node.JS.

```console
sudo apt install nodejs
```

Στη συνέχεια, μεταφερόμαστε στον φάκελο application/ του project μας και μέσω του npm εγκαθιστούμε τις απαιτούμενες βιβλιοθήκες.

```console
cd path/to/internet-and-applications/application
```

Εγκατάσταση της React.

```console
npm install --save react
```

Εγκατάσταση της Bootstrap.

```console
npm install --save react-bootstrap bootstrap@3
```

Εγκατάσταση της Leaflet.

```console
npm install --save leaflet react-leaflet
```

Εγακτάσταση της Moment.

```console
npm install --save moment
```

Τέλος, εκτέλεση της εφαρμογής.

```console
npm start
```


#### Εναλλακτικά
Είναι επίσης δυνατό το χτίσιμο της τελικής εφαρμογής και το σερβίρισμα του μέσω κάποιας υπηρεσίας σε ένα συγκεκριμένο port. Έτσι, μετά την εγκατάσταση του Node.JS και τη μετάβαση στο φάκελο της εφαρμογής, μπορούμε να κάνουμε build την εφαρμογή ως εξής:

```console
npm run build
```

Έπειτα, σε περιβάλλον Ubuntu 20.04, εγκαθιστούμε το serve, με το οποίο σερβίρουμε την εφαρμογή σε κάποιο port (τυχαίο ή της επιλογής μας).

```console
sudo snap install serve
```

```console
serve -d build
```
