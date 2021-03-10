class ImageSerializer
    def initialize(image)
        @image = image
    end

    def to_serialized_json
        options = {
            include: {
                likes: {
                    except: [:created_at, :updated_at]
                }, 
                comments: {
                    include: {
                        user: {
                            except: [:created_at, :updated_at]
                        }
                    },
                    except: [:created_at, :updated_at]
                },
                user: {
                    except: [:created_at, :updated_at]
                }
            }, 
            except: [:created_at, :updated_at]
        }
        @image.to_json(options)
    end
end