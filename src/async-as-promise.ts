import { test1 } from './async-test'
import { test2 } from './async-test'

test1()
    .then(() => test2())