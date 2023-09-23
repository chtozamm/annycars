<Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="text-gray-400"
                    onClick={() => {
                      setFormName(car.name);
                      setFormYear(car.year);
                      setFormLink(car.link);
                      setFormImage(car.image);
                      setFormPrice(car.price);
                      setFormMileage(car.mileage);
                      setFormSeller(car.seller);
                      setFormAdvantages(car.advantages);
                      setFormDisadvantages(car.disadvantages);
                      setFormIsSold(car.isSold);
                    }}
                  >
                    <svg
                      fill="none"
                      shapeRendering="geometricPrecision"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      viewBox="0 0 24 24"
                      className="h-6 w-6"
                    >
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-fit">
                  <DialogHeader>
                    <DialogTitle>Изменить данные</DialogTitle>
                    {/* <DialogDescription>
                      Обязательными полями являются только &quot;Название&quot;
                      и &quot;Ссылка на объявление&quot;.
                    </DialogDescription> */}
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="name"
                        className="break-words text-right"
                      >
                        Название
                      </Label>
                      <Input
                        id="name"
                        className="col-span-3"
                        required
                        defaultValue={car.name}
                        onChange={(e) => setFormName(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="year"
                        className="break-words text-right"
                      >
                        Год выпуска
                      </Label>
                      <Input
                        id="year"
                        className="col-span-3"
                        defaultValue={car.year}
                        onChange={(e) => setFormYear(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="link"
                        className="break-words text-right"
                      >
                        Объявление
                      </Label>
                      <Input
                        id="link"
                        className="col-span-3"
                        placeholder="https://"
                        required
                        defaultValue={car.link}
                        onChange={(e) => setFormLink(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="image"
                        className="break-words text-right"
                      >
                        Фото
                      </Label>
                      <Input
                        id="image"
                        className="col-span-3"
                        placeholder="https://"
                        defaultValue={car.image}
                        onChange={(e) => setFormImage(e.target.value)}
                      />
                    </div>
                    <div className="relative grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="price"
                        className="break-words text-right"
                      >
                        Цена
                      </Label>
                      <Input
                        id="price"
                        className="col-span-3 pr-10"
                        defaultValue={car.price}
                        onChange={(e) => setFormPrice(e.target.value)}
                      />
                      <span className="absolute right-4 top-2">₽</span>
                    </div>
                    <div className="relative grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="mileage"

                        className="break-words text-right"
                      >
                        Пробег
                      </Label>
                      <Input
                        id="mileage"
                        className="col-span-3 pr-10"
                        defaultValue={car.mileage}
                        onChange={(e) => setFormMileage(e.target.value)}
                      />
                      <span className="absolute right-3 top-2">км</span>
                    </div>
                    <div className="relative grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="seller"

                        className="break-words text-right"
                      >
                        Продавец
                      </Label>
                      <Input
                        id="seller"
                        className="col-span-3"
                        defaultValue={car.seller}
                        onChange={(e) => setFormSeller(e.target.value)}
                      />
                    </div>
                    <div className="relative grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="advantages"

                        className="break-words text-right"
                      >
                        Преимущества
                      </Label>
                      <Input
                        id="advantages"
                        className="col-span-3"
                        defaultValue={car.advantages}
                        onChange={(e) => setFormAdvantages(e.target.value)}
                        placeholder="через запятую"
                      />
                    </div>
                    <div className="relative grid grid-cols-4 items-center gap-4">
                      <Label
                        // htmlFor="disadvantages"

                        className="break-words text-right"
                      >
                        Недостатки
                      </Label>
                      <Input
                        id="disadvantages"
                        className="col-span-3"
                        defaultValue={car.disadvantages}
                        onChange={(e) => setFormDisadvantages(e.target.value)}
                        placeholder="через запятую"
                      />
                    </div>
                    <div className="mx-auto mb-6 flex w-fit items-center gap-1.5">
                      <Input
                        id="is-sold"
                        className="w-fit accent-black"
                        type="checkbox"
                        defaultChecked={car.isSold}
                        checked={formIsSold}
                        onChange={() => setFormIsSold(!formIsSold)}
                      />
                      <Label htmlFor="is-sold">Автомобиль продан</Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="mx-auto mt-3 w-fit sm:mx-0 sm:mt-0"
                        >
                          Удалить
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Вы уверены, что хотите удалить объявление?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {car.name}, {car.year}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Отмена</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={async () => await deleteCar(car)}
                          >
                            Удалить
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                    <DialogClose>
                      <Button
                        type="submit"
                        onClick={() => handleUpdateCar(car)}
                      >
                        Сохранить
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>