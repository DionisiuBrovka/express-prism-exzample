const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

exports.getAll = async () => {
    const objs = await prisma.user.findMany({
        include: {
            posts: true
        }
    })

    return objs;
}

exports.getById = async (idArg) => {
    const obj = await prisma.user.findUnique({
        where: {
            id: idArg,
        },
        include: {
            posts: true,
            profile: true
        }
    })

    return obj;
}

exports.create = async (emailArg, nameArg) => {
    const obj = await prisma.user.create({
        data: {
            email: emailArg,
            name: nameArg
        }
    })

    return obj;
}

exports.deleteById = async (idArg) => {
    const obj = await prisma.user.delete({
        where: {
            id: idArg,
        }
    })

    return obj;
}