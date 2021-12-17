import * as R from "../../mod.ts"
// const { np, Table, M, int } = R
// import matplotlib.pyplot as plt
const oo = Infinity

function oneHot(y) {
    let table = R.matrix(y.length, 10) // np.zeros([y.shape[0], 10])
    for (let i in y) {
        let hot = R.int(y[i][0])
        table[i][hot] = 1
        // console.log('onehot:i=', i, 'y[i][0]=', y[i][0])
    }
    return table
}

function normalize(x) {
    return R.map1(x, (n)=>n/255)
}

async function loadData(path) {
    let text = await Deno.readTextFile(path)
    let table = R.loadCsv(text, ',')
    // console.log('table=', table)
    let ftable = R.toNumber(table)
    // console.log('ftable=', ftable)
    // Deno.exit(1)
    return [normalize(R.cols(ftable, 1, oo)), oneHot(R.cols(ftable, 0, 1))]
    // return normalize(data[:,1:]),one_hot(data[:,:1])
}

let [xTest, yTest] = await loadData('mnist_test.csv')
console.log('yTest=', yTest)

class NeuralNetwork {
    constructor(X, y, batch = 64, lr = 1e-3,  epochs = 5) {
        this.input = X 
        this.target = y
        this.batch = batch
        this.epochs = epochs
        this.lr = lr
        
        this.x = this.input[:this.batch] // batch input 
        this.y = this.target[:this.batch] // batch target value
        this.loss = []
        this.acc = []
        
        this.init_weights()
    }

    init_weights() {
        this.W1 = np.randn(this.input.shape[1],256)
        this.W2 = np.randn(this.W1.shape[1],128)
        this.W3 = np.randn(this.W2.shape[1],this.y.shape[1])

        this.b1 = np.randn(this.W1.shape[1])
        this.b2 = np.randn(this.W2.shape[1])
        this.b3 = np.randn(this.W3.shape[1])
    }

    ReLU(x) {
        return np.maximum(0,x)
    }

    dReLU(this,x) {
        return 1 * (x > 0) 
    }

    softmax(this, z) {
        z = z - np.max(z, axis = 1).reshape(z.shape[0],1)
        return np.exp(z) / np.sum(np.exp(z), axis = 1).reshape(z.shape[0],1)
    }

    shuffle(this) {
        idx = [i for i in range(this.input.shape[0])]
        np.shuffle(idx)
        this.input = this.input[idx]
        this.target = this.target[idx]
    }

    feedforward(this) {
        assert this.x.shape[1] == this.W1.shape[0]
        this.z1 = this.x.dot(this.W1) + this.b1
        this.a1 = this.ReLU(this.z1)

        assert this.a1.shape[1] == this.W2.shape[0]
        this.z2 = this.a1.dot(this.W2) + this.b2
        this.a2 = this.ReLU(this.z2)

        assert this.a2.shape[1] == this.W3.shape[0]
        this.z3 = this.a2.dot(this.W3) + this.b3
        this.a3 = this.softmax(this.z3)
        this.error = this.a3 - this.y
    }
        
    backprop(this) {
        dcost = (1/this.batch)*this.error
        
        bp2 = np.dot((dcost),self.W3.T) * self.dReLU(self.z2)
        bp1 = np.dot(bp2, self.W2.T)*self.dReLU(self.z1)

        DW3 = np.dot(dcost.T,self.a2).T
        DW2 = np.dot(bp2.T,self.a1).T
        DW1 = np.dot(bp1.T,self.x).T

        db3 = np.sum(dcost,axis = 0)
        db2 = np.sum(bp2,axis = 0)
        db1 = np.sum(bp1,axis = 0)
 
        assert DW3.shape == this.W3.shape
        assert DW2.shape == this.W2.shape
        assert DW1.shape == this.W1.shape
        
        assert db3.shape == this.b3.shape
        assert db2.shape == this.b2.shape
        assert db1.shape == this.b1.shape 
        
        this.W3 = this.W3 - this.lr * DW3
        this.W2 = this.W2 - this.lr * DW2
        this.W1 = this.W1 - this.lr * DW1
        
        this.b3 = this.b3 - this.lr * db3
        this.b2 = this.b2 - this.lr * db2
        this.b1 = this.b1 - this.lr * db1
    }

    train(this) {
        for epoch in range(this.epochs):
            l = 0
            acc = 0
            this.shuffle()
            print("epoch={}".format(epoch))
            
            for batch in range(this.input.shape[0]//this.batch-1):
                start = batch*this.batch
                end = (batch+1)*this.batch
                this.x = this.input[start:end]
                this.y = this.target[start:end]
                this.feedforward()
                this.backprop()
                l+=np.mean(this.error**2)
                acc+= np.count_nonzero(np.argmax(this.a3,axis=1) == np.argmax(this.y,axis=1)) / this.batch
                
            this.loss.append(l/(this.input.shape[0]//this.batch))
            this.acc.append(acc*100/(this.input.shape[0]//this.batch))
    }

    plot(this) {
        plt.figure(dpi = 125)
        plt.plot(this.loss)
        plt.xlabel("Epochs")
        plt.ylabel("Loss")
    }

    acc_plot(this) {
        plt.figure(dpi = 125)
        plt.plot(this.acc)
        plt.xlabel("Epochs")
        plt.ylabel("Accuracy")
    }

    test(this,xtest,ytest) {
        this.x = xtest
        this.y = ytest
        this.feedforward()
        acc = np.count_nonzero(np.argmax(this.a3,axis=1) == np.argmax(this.y,axis=1)) / this.x.shape[0]
        print("Accuracy:", 100 * acc, "%")
    }
}

/*
print("start()")
NN = NeuralNetwork(X_train, y_train) 
print("train()")
NN.train()
print("plot()")
NN.plot()
NN.test(X_test,y_test)
*/
