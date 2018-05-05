const fb = require("firebase");
require("firebase/firestore");

console.log(fb);

const fbConfig = {
  apiKey: "AIzaSyACiIVanKhOVCWeX4QygHuUxbgkzxd6XCI",
  authDomain: "landlord-df429.firebaseapp.com",
  databaseURL: "https://landlord-df429.firebaseio.com",
  projectId: "landlord-df429",
  storageBucket: "landlord-df429.appspot.com",
  messagingSenderId: "640340712035"
};

const strings = {
  dev: "dev",
  prod: "prod",
  root: "root",
  cases: "cases",
  tenants: "tenants",
  assets: "assets"
};

class FirebaseService {
  db = null;
  caseRoot = null;
  dispatch = () => {};

  initFirebase = async dispatch => {
    await fb.initializeApp(fbConfig);
    this.db = fb
      .firestore()
      .collection(strings.dev)
      .doc(strings.root);
    this.dispatch = dispatch;
  };

  initCase = caseId => {
    this.caseRoot = this.db.collection(strings.cases).doc(caseId);
  };

  saveTenant = async tenant => {
    await this.caseRoot.collection(strings.tenants).add(tenant);
  };
  saveAsset = async asset => {
    await this.caseRoot.collection(strings.assets).add(asset);
  };

  listenForTenants = listener =>
    handleCollectionSnapshot(
      listener,
      this.caseRoot.collection(strings.tenants)
    );

  listenForAssets = listener =>
    handleCollectionSnapshot(
      listener,
      this.caseRoot.collection(strings.assets)
    );
}

const handleCollectionSnapshot = (listener, collection) => {
  const unsubscribe = collection.onSnapshot(res => {
    const outputArr = [];
    res.forEach(doc => outputArr.push(doc.data()));
    try {
      listener(outputArr);
    } catch (e) {
      debugger;
    }
  });
  return unsubscribe;
};

export const firebaseService = new FirebaseService();
