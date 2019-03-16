const fb = require("firebase");
require("firebase/firestore");

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
  assets: "assets",
  contracts: "contracts",
  tasks: "tasks"
};

class FirebaseService {
  db = null;
  caseRoot = null;
  dispatch = () => {};

  constructor() {
    fb.initializeApp(fbConfig);

    const firestore = fb.firestore();
    const settings = { timestampsInSnapshots: true };
    firestore.settings(settings);

    this.db = firestore.collection(strings.dev).doc(strings.root);
  }

  initFirebase = async dispatch => {
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
  saveContract = async contract => {
    await this.caseRoot.collection(strings.contracts).add(contract);
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

  listenForContracts = listener =>
    handleCollectionSnapshot(
      listener,
      this.caseRoot.collection(strings.contracts)
    );

  getInstance = () => fb;

  logout = () => fb.auth().signOut();

  isLoggedIn = () => fb.auth().currentUser != null;

  onAuthStateChanged = func => fb.auth().onAuthStateChanged(func);
}

const handleCollectionSnapshot = (listener, collection) => {
  const unsubscribe = collection.onSnapshot(res => {
    const outputArr = [];
    res.forEach(doc => outputArr.push({ id: doc.id, ...doc.data() }));
    try {
      listener(outputArr);
    } catch (e) {
      debugger;
    }
  });
  return unsubscribe;
};

export const firebaseService = new FirebaseService();
